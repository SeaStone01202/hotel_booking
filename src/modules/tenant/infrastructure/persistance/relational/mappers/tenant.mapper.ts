import { TenantEntity } from '../entities/tenant.entity';
import { Tenant } from '../domain/tenant.domain';

export class TenantMapper {
  static toDomain(entity: TenantEntity): Tenant {
    return new Tenant({
      id: entity.id,
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
    return entity;
  }
}
