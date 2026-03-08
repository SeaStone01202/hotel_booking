import { UserEntity } from '../entities/user.entity';
import { User } from '../domain/user.domain';

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    return new User({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }

  static toEntity(domain: User): Partial<UserEntity> {
    const entity: Partial<UserEntity> = {};
    if (domain.id) {
      entity.id = domain.id;
    }
    return entity;
  }
}
