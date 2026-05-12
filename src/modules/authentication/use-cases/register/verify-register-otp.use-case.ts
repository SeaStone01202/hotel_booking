import { BadRequestException, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { TenantMemberEntity } from 'src/modules/tenant/infrastructure/persistence/relational/entities/tenant-member.entity';
import { TenantEntity } from 'src/modules/tenant/infrastructure/persistence/relational/entities/tenant.entity';
import { TenantRepository } from 'src/modules/tenant/infrastructure/persistence/tenant.repository.interface';
import { UserEntity } from 'src/modules/user/infrastructure/persistence/relational/entities/user.entity';
import { UserRepository } from 'src/modules/user/infrastructure/persistence/user.repository.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class VerifyRegisterOtpUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tenantRepository: TenantRepository,
    private readonly redis: Redis,
    private readonly dataSource: DataSource,
  ) {}

  async execute({
    email,
    otp,
    password,
    fullName,
    tenantName,
    tenantSubdomain,
    phone,
  }: {
    email: string;
    otp: string;
    password: string;
    fullName: string;
    tenantName: string;
    tenantSubdomain: string;
    phone: string;
  }) {
    const storedOtp = await this.redis.get(`otp:${email}`);
    if (!storedOtp || storedOtp !== otp) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new BadRequestException('User already exists');
    }

    const tenantExisting =
      await this.tenantRepository.findByTenantNameActive(tenantSubdomain);
    if (tenantExisting) {
      throw new BadRequestException('Tenant subdomain already exists');
    }

    try {
      await this.dataSource.transaction(async (manager) => {
        const userRepo = manager.getRepository(UserEntity);
        const tenantRepo = manager.getRepository(TenantEntity);
        const tenantMemberRepo = manager.getRepository(TenantMemberEntity);

        const user = userRepo.create({
          email,
          passwordHash: password,
          fullName,
          phone,
        });

        await userRepo.save(user);

        const tenant = tenantRepo.create({
          name: tenantName,
          subdomain: tenantSubdomain,
          ownerId: user.id,
        });

        await tenantRepo.save(tenant);

        const tenantMember = tenantMemberRepo.create({
          tenantId: tenant.id,
          userId: user.id,
          email: user.email,
          isPrimary: true,
        });

        await tenantMemberRepo.save(tenantMember);
      });
    } catch (error) {
      throw new BadRequestException(
        `Failed to create user and tenant ${error.message}`,
      );
    }
    return true;
  }
}
