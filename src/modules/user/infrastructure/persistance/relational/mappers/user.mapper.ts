import { User } from 'src/modules/user/domain/user.domain';
import { UserEntity } from '../entities/user.entity';

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
