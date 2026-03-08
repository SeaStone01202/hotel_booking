import { TenantRepository } from '../repositories/tenant.repository';
import { TenantRepositoryImpl } from '../repositories/tenant.repository.impl';

export const TenantProviders = [
  {
    provide: TenantRepository,
    useClass: TenantRepositoryImpl,
  },
];
