import { PaginatedResult } from "src/core/common/dto/paginated-result.dto";
import { AuthenticationEntity } from "./relational/entities/authentication.entity";

export abstract class AuthenticationRepository {
  abstract create(data: Partial<AuthenticationEntity>): Promise<AuthenticationEntity>;
  abstract findAll(pagination: any): Promise<PaginatedResult<AuthenticationEntity>>;
  abstract findById(id: string): Promise<AuthenticationEntity | null>;
  abstract findWithFilter(filter: any): Promise<PaginatedResult<AuthenticationEntity>>;
  abstract update(id: string, data: Partial<AuthenticationEntity>): Promise<AuthenticationEntity>;
  abstract delete(id: string): Promise<void>;
}
