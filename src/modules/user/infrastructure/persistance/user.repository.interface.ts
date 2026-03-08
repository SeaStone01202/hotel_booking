import { UserEntity } from '../entities/user.entity';
 import { PaginatedResult } from 'src/common/dto/paginated-result.dto';

export abstract class UserRepository {
  abstract create(data: Partial<UserEntity>): Promise<UserEntity>;
  abstract findAll(pagination: any): Promise<PaginatedResult<UserEntity>>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract findWithFilter(filter: any): Promise<PaginatedResult<UserEntity>>;
  abstract update(id: string, data: Partial<UserEntity>): Promise<UserEntity>;
  abstract delete(id: string): Promise<void>;
}
