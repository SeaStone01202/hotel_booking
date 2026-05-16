import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TenantMemberRole } from 'src/modules/tenant/infrastructure/persistence/relational/enums/tenant-member-role.enum';
import { TenantRepository } from 'src/modules/tenant/infrastructure/persistence/tenant.repository.interface';
import { UserRepository } from 'src/modules/user/infrastructure/persistence/user.repository.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tenantRepository: TenantRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const memberships = (user.tenantMemberships as any[]) || [];
    if (memberships.length === 0) {
      throw new UnauthorizedException('No tenant membership found');
    }

    // Determine active tenant
    const activeMembership = user.activeTenantId
      ? memberships.find((m) => m.tenantId === user.activeTenantId)
      : null;
    const targetMembership = activeMembership || memberships[0];

    // If no active tenant set yet, persist it
    if (!user.activeTenantId || !activeMembership) {
      await this.userRepository.update(user.id, {
        activeTenantId: targetMembership.tenantId,
      });
      user.activeTenantId = targetMembership.tenantId;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tenant = await this.tenantRepository.findById(
      targetMembership.tenantId,
    );
    if (!tenant) {
      throw new UnauthorizedException('Tenant is deleted');
    }

    // Update last login timestamp
    await this.userRepository.update(user.id, {
      lastLoginAt: new Date(),
    });

    // Remove password and relations from user object
    const {
      passwordHash,
      ownedTenants,
      tenantMemberships,
      ...userWithoutPassword
    } = user;

    // Generate JWT token
    const accessToken = this.jwtService.sign(
      {
        userId: user.id,
        email: user.email,
        role: targetMembership.role ?? null,
        tenantId: targetMembership.tenantId,
        type: 'access',
      },
      {
        expiresIn: '1h',
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        sub: user.id,
        type: 'refresh',
      },
      {
        expiresIn: '7d',
      },
    );

    // Build available tenants list
    const tenantIds = memberships.map((m) => m.tenantId);
    const tenants = await Promise.all(
      tenantIds.map(async (tenantId: string) => {
        const t = await this.tenantRepository.findById(tenantId);
        const m = memberships.find((mem) => mem.tenantId === tenantId);
        return {
          tenantId,
          name: t?.name ?? null,
          subdomain: t?.subdomain ?? null,
          role: TenantMemberRole[m?.role] ?? null,
          isPrimary: m?.isPrimary ?? false,
        };
      }),
    );

    return {
      accessToken,
      refreshToken,
      user: userWithoutPassword,
      tenants,
    };
  }
}
