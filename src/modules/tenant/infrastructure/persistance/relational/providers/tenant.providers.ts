import { TenantRepository } from "../../tenant.repository.interface";
import { TenantRepositoryImpl } from "../repositories/tenant.repository";

export const TenantProviders = [
  {
    provide: TenantRepository,
    useClass: TenantRepositoryImpl,
  },
];
