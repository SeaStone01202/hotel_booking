import { AuthenticationEntity } from '../entities/authentication.entity';
 import { PaginatedResult } from 'src/common/dto/paginated-result.dto';

export abstract class AuthenticationRepository {
  abstract create(data: Partial<AuthenticationEntity>): Promise<AuthenticationEntity>;
  abstract findAll(pagination: any): Promise<PaginatedResult<AuthenticationEntity>>;
  abstract findById(id: string): Promise<AuthenticationEntity | null>;
  abstract findWithFilter(filter: any): Promise<PaginatedResult<AuthenticationEntity>>;
  abstract update(id: string, data: Partial<AuthenticationEntity>): Promise<AuthenticationEntity>;
  abstract delete(id: string): Promise<void>;
}
