import { Authentication } from 'src/modules/authentication/domain/authentication.domain';
import { AuthenticationEntity } from '../entities/authentication.entity';

export class AuthenticationMapper {
  static toDomain(entity: AuthenticationEntity): Authentication {
    return new Authentication({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }

  static toEntity(domain: Authentication): Partial<AuthenticationEntity> {
    const entity: Partial<AuthenticationEntity> = {};
    if (domain.id) {
      entity.id = domain.id;
    }
    return entity;
  }
}
