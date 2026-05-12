import { PaginatedResult } from 'src/core/common/dto/paginated-result.dto';
import { TenantMemberEntity } from './relational/entities/tenant-member.entity';

export abstract class TenantMemberRepository {
  abstract create(
    data: Partial<TenantMemberEntity>,
  ): Promise<TenantMemberEntity>;

  abstract findAll(
    pagination: any,
  ): Promise<PaginatedResult<TenantMemberEntity>>;

  abstract findById(id: string): Promise<TenantMemberEntity | null>;

  abstract findWithFilter(
    filter: any,
  ): Promise<PaginatedResult<TenantMemberEntity>>;

  abstract update(
    id: string,
    data: Partial<TenantMemberEntity>,
  ): Promise<TenantMemberEntity>;

  abstract delete(id: string): Promise<void>;
}
