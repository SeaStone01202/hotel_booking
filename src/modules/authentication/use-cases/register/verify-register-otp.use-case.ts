import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import Redis from 'ioredis';
import { ERROR_CODES } from 'src/core/common/errors/error-code';
import { TenantMemberEntity } from 'src/modules/tenant/infrastructure/persistence/relational/entities/tenant-member.entity';
import { TenantMemberRole } from 'src/modules/tenant/infrastructure/persistence/relational/enums/tenant-member-role.enum';
import { TenantEntity } from 'src/modules/tenant/infrastructure/persistence/relational/entities/tenant.entity';
import { TenantRepository } from 'src/modules/tenant/infrastructure/persistence/tenant.repository.interface';
import { UserEntity } from 'src/modules/user/infrastructure/persistence/relational/entities/user.entity';
import { UserRepository } from 'src/modules/user/infrastructure/persistence/user.repository.interface';
import { BranchEntity } from 'src/modules/branch/infrastructure/persistance/relational/entities/branch.entity';
import { BranchRepository } from 'src/modules/branch/infrastructure/persistance/branch.repository.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class VerifyRegisterOtpUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tenantRepository: TenantRepository,
    private readonly branchRepository: BranchRepository,
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
    if (!storedOtp) {
      throw new BadRequestException({
        errorCode: ERROR_CODES.BAD_REQUEST.EXPIRED_OTP,
      });
    }
    if (storedOtp !== otp) {
      throw new BadRequestException({
        errorCode: ERROR_CODES.BAD_REQUEST.INVALID_OTP,
      });
    }

    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new BadRequestException({
        errorCode: ERROR_CODES.BAD_REQUEST.USER_ALREADY_EXISTS,
      });
    }

    const tenantExisting =
      await this.tenantRepository.findByTenantNameActive(tenantSubdomain);
    if (tenantExisting) {
      throw new BadRequestException({
        errorCode: ERROR_CODES.BAD_REQUEST.TENANT_SUBDOMAIN_EXISTS,
      });
    }

    try {
      await this.dataSource.transaction(async (manager) => {
        const userRepo = manager.getRepository(UserEntity);
        const tenantRepo = manager.getRepository(TenantEntity);
        const tenantMemberRepo = manager.getRepository(TenantMemberEntity);
        const branchRepo = manager.getRepository(BranchEntity);

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = userRepo.create({
          email,
          passwordHash: hashedPassword,
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
          role: TenantMemberRole.OWNER,
        });

        await tenantMemberRepo.save(tenantMember);

        // Create default branch "Main"
        const mainBranch = branchRepo.create({
          tenantId: tenant.id,
          name: 'Main',
          address: '',
          phone: undefined,
          email: undefined,
        });

        await branchRepo.save(mainBranch);
      });
    } catch (error) {
      // Log the error for debugging (in production, use a logger)
      console.error('Transaction failed in VerifyRegisterOtpUseCase:', error);
      throw new BadRequestException({
        errorCode: ERROR_CODES.BAD_REQUEST,
      });
    }
    return true;
  }
}
