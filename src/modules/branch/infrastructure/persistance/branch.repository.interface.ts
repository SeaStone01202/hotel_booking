import { PaginatedResult } from "src/core/common/dto/paginated-result.dto";
import { BranchEntity } from "./relational/entities/branch.entity";

export abstract class BranchRepository {
  abstract create(data: Partial<BranchEntity>): Promise<BranchEntity>;
  abstract findAll(pagination: any): Promise<PaginatedResult<BranchEntity>>;
  abstract findById(id: string): Promise<BranchEntity | null>;
  abstract findWithFilter(filter: any): Promise<PaginatedResult<BranchEntity>>;
  abstract update(id: string, data: Partial<BranchEntity>): Promise<BranchEntity>;
  abstract delete(id: string): Promise<void>;
}
