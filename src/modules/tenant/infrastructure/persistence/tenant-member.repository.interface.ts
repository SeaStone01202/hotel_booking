import { PaginatedResult } from 'src/core/common/dto/paginated-result.dto';
import { TenantMember } from 'src/modules/tenant/domain/tenant-member.domain';

export abstract class TenantMemberRepository {
  abstract create(data: Partial<TenantMember>): Promise<TenantMember>;

  abstract findAll(pagination: any): Promise<PaginatedResult<TenantMember>>;

  abstract findById(id: string): Promise<TenantMember | null>;

  abstract findWithFilter(filter: any): Promise<PaginatedResult<TenantMember>>;

  abstract update(
    id: string,
    data: Partial<TenantMember>,
  ): Promise<TenantMember>;

  abstract delete(id: string): Promise<void>;
}
