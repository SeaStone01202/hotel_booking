import { PaginatedResult } from 'src/core/common/dto/paginated-result.dto';
import { TenantEntity } from './relational/entities/tenant.entity';

export abstract class TenantRepository {
  abstract create(data: Partial<TenantEntity>): Promise<TenantEntity>;
  abstract findAll(pagination: any): Promise<PaginatedResult<TenantEntity>>;
  abstract findById(id: string): Promise<TenantEntity | null>;
  abstract findWithFilter(filter: any): Promise<PaginatedResult<TenantEntity>>;
  abstract update(id: string, data: Partial<TenantEntity>): Promise<TenantEntity>;
  abstract delete(id: string): Promise<void>;
}
