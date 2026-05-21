import { PaginatedResult } from 'src/core/common/dto/paginated-result.dto';
import { User } from '../../domain/user.domain';

export abstract class UserRepository {
  abstract create(data: Partial<User>): Promise<User>;
  abstract findAll(pagination: any): Promise<PaginatedResult<User>>;
  abstract findById(id: number): Promise<User | null>;
  abstract findWithFilter(filter: any): Promise<PaginatedResult<User>>;
  abstract update(id: number, data: Partial<User>): Promise<User>;
  abstract delete(id: number): Promise<void>;

  abstract findByEmail(email: string): Promise<User | null>;
}
