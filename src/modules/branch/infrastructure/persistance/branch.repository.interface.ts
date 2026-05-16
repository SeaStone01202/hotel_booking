import { PaginatedResult } from 'src/core/common/dto/paginated-result.dto';
import { Branch } from 'src/modules/branch/domain/branch.domain';

export abstract class BranchRepository {
  abstract create(data: Partial<Branch>): Promise<Branch>;
  abstract findAll(pagination: any): Promise<PaginatedResult<Branch>>;
  abstract findById(id: string): Promise<Branch | null>;
  abstract findWithFilter(filter: any): Promise<PaginatedResult<Branch>>;
  abstract update(id: string, data: Partial<Branch>): Promise<Branch>;
  abstract delete(id: string): Promise<void>;
}
