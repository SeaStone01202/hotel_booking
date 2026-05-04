import { PaginatedResult } from "src/core/common/dto/paginated-result.dto";
import { UserEntity } from "./relational/entities/user.entity";

export abstract class UserRepository {
  abstract create(data: Partial<UserEntity>): Promise<UserEntity>;
  abstract findAll(pagination: any): Promise<PaginatedResult<UserEntity>>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract findWithFilter(filter: any): Promise<PaginatedResult<UserEntity>>;
  abstract update(id: string, data: Partial<UserEntity>): Promise<UserEntity>;
  abstract delete(id: string): Promise<void>;
}
