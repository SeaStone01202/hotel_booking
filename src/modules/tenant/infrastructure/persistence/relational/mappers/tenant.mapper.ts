import { Tenant } from 'src/modules/tenant/domain/tenant.domain';
import { TenantEntity } from '../entities/tenant.entity';

export class TenantMapper {
  static toDomain(entity: TenantEntity): Tenant {
    return new Tenant({
      id: entity.id,
      uid: entity.uid,
      name: entity.name,
      subdomain: entity.subdomain,
      ownerId: entity.ownerId,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }

  static toEntity(domain: Tenant): Partial<TenantEntity> {
    const entity: Partial<TenantEntity> = {};
    if (domain.id) {
      entity.id = domain.id;
    }
    if (domain.uid) {
      entity.uid = domain.uid;
    }
    entity.name = domain.name;
    entity.subdomain = domain.subdomain;
    entity.ownerId = domain.ownerId;
    entity.status = domain.status;
    entity.createdAt = domain.createdAt || new Date();
    entity.updatedAt = domain.updatedAt;
    entity.deletedAt = domain.deletedAt;
    return entity;
  }
}
