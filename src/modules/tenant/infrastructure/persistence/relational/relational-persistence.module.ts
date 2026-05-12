import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantMemberRepository } from '../tenant-member.repository.interface';
import { TenantRepository } from '../tenant.repository.interface';
import { TenantMemberEntity } from './entities/tenant-member.entity';
import { TenantEntity } from './entities/tenant.entity';
import { TenantMemberRepositoryImpl } from './repositories/tenant-member.repository';
import { TenantRepositoryImpl } from './repositories/tenant.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([TenantEntity, TenantMemberEntity])],
  providers: [
    {
      provide: TenantRepository,
      useClass: TenantRepositoryImpl,
    },
    {
      provide: TenantMemberRepository,
      useClass: TenantMemberRepositoryImpl,
    },
  ],
  exports: [TenantRepository, TenantMemberRepository],
})
export class RelationalTenantPersistenceModule {}
