import { User } from 'src/modules/user/domain/user.domain';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    return new User({
      id: entity.id,
      uid: entity.uid,
      fullName: entity.fullName,
      email: entity.email,
      phone: entity.phone,
      passwordHash: entity.passwordHash,
      ownedTenants: entity.ownedTenants,
      tenantMemberships: entity.tenantMemberships,
      isActive: entity.isActive,
      activeTenantId: entity.activeTenantId,
      lastLoginAt: entity.lastLoginAt,
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
    if (domain.uid) {
      entity.uid = domain.uid;
    }
    if (domain.fullName) {
      entity.fullName = domain.fullName;
    }
    if (domain.email) {
      entity.email = domain.email;
    }
    if (domain.phone) {
      entity.phone = domain.phone;
    }
    if (domain.passwordHash) {
      entity.passwordHash = domain.passwordHash;
    }
    if (domain.ownedTenants) {
      entity.ownedTenants = domain.ownedTenants;
    }
    if (domain.tenantMemberships) {
      entity.tenantMemberships = domain.tenantMemberships;
    }
    if (domain.isActive !== undefined) {
      entity.isActive = domain.isActive;
    }
    if (domain.lastLoginAt) {
      entity.lastLoginAt = domain.lastLoginAt;
    }
    if (domain.createdAt) {
      entity.createdAt = domain.createdAt;
    }
    if (domain.updatedAt) {
      entity.updatedAt = domain.updatedAt;
    }
    if (domain.deletedAt) {
      entity.deletedAt = domain.deletedAt;
    }

    return entity;
  }
}
