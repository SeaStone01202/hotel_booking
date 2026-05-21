import { PaginatedResult } from 'src/core/common/dto/paginated-result.dto';
import { Tenant } from 'src/modules/tenant/domain/tenant.domain';

export abstract class TenantRepository {
  abstract create(data: Partial<Tenant>): Promise<Tenant>;

  abstract findAll(pagination: any): Promise<PaginatedResult<Tenant>>;

  abstract findById(id: number): Promise<Tenant | null>;

  abstract findWithFilter(filter: any): Promise<PaginatedResult<Tenant>>;

  abstract update(id: number, data: Partial<Tenant>): Promise<Tenant>;

  abstract delete(id: number): Promise<void>;

  abstract findByTenantNameActive(tenantName: string): Promise<Tenant | null>;
}
