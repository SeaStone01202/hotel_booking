import { PaginatedResult } from 'src/core/common/dto/paginated-result.dto';
import { User } from '../../domain/user.domain';

export abstract class UserRepository {
  abstract create(data: Partial<User>): Promise<User>;
  abstract findAll(pagination: any): Promise<PaginatedResult<User>>;
  abstract findById(id: string): Promise<User | null>;
  abstract findWithFilter(filter: any): Promise<PaginatedResult<User>>;
  abstract update(id: string, data: Partial<User>): Promise<User>;
  abstract delete(id: string): Promise<void>;

  abstract findByEmail(email: string): Promise<User | null>;
}
