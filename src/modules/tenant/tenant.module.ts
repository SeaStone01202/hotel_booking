import { Module } from '@nestjs/common';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { RelationalTenantPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalTenantPersistenceModule],
  controllers: [TenantController],
  providers: [TenantService],
  exports: [TenantService, RelationalTenantPersistenceModule],
})
export class TenantModule {}
