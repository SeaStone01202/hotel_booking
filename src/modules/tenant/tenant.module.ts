import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { TenantEntity } from './infrastructure/entities/tenant.entity';
import { TenantProviders } from './infrastructure/providers/tenant.providers';

@Module({
  imports: [TypeOrmModule.forFeature([TenantEntity])],
  controllers: [TenantController],
  providers: [TenantService, ...TenantProviders],
  exports: [TenantService],
})
export class TenantModule {}
