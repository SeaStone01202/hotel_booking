import { Tenant } from 'src/modules/tenant/domain/tenant.domain';
import { TenantEntity } from '../entities/tenant.entity';
import { TenantMemberEntity } from '../entities/tenant-member.entity';
import { TenantMember } from 'src/modules/tenant/domain/tenant-member.domain';

export class TenantMemberMapper {
  static toDomain(entity: TenantMemberEntity): TenantMember {
    return new TenantMember({
      id: entity.id,
      tenantId: entity.tenantId,
      userId: entity.userId,
      email: entity.email,
      isPrimary: entity.isPrimary,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }

  static toEntity(domain: TenantMember): Partial<TenantMemberEntity> {
    const entity: Partial<TenantMemberEntity> = {};
    if (domain.id) {
      entity.id = domain.id;
    }
    entity.tenantId = domain.tenantId;
    entity.userId = domain.userId;
    entity.email = domain.email;
    entity.isPrimary = domain.isPrimary;
    entity.createdAt = domain.createdAt || new Date();
    entity.updatedAt = domain.updatedAt;
    entity.deletedAt = domain.deletedAt;
    return entity;
  }
}
