import { BranchEntity } from '../entities/branch.entity';
 import { PaginatedResult } from 'src/common/dto/paginated-result.dto';

export abstract class BranchRepository {
  abstract create(data: Partial<BranchEntity>): Promise<BranchEntity>;
  abstract findAll(pagination: any): Promise<PaginatedResult<BranchEntity>>;
  abstract findById(id: string): Promise<BranchEntity | null>;
  abstract findWithFilter(filter: any): Promise<PaginatedResult<BranchEntity>>;
  abstract update(id: string, data: Partial<BranchEntity>): Promise<BranchEntity>;
  abstract delete(id: string): Promise<void>;
}
