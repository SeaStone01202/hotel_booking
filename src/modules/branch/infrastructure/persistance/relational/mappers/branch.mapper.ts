import { Branch } from 'src/modules/branch/domain/branch.domain';
import { BranchEntity } from '../entities/branch.entity';

export class BranchMapper {
  static toDomain(entity: BranchEntity): Branch {
    return new Branch({
      id: entity.id,
      tenantId: entity.tenantId,
      name: entity.name,
      phone: entity.phone,
      email: entity.email,
      address: entity.address,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }

  static toEntity(domain: Branch): Partial<BranchEntity> {
    const entity: Partial<BranchEntity> = {};
    if (domain.id) {
      entity.id = domain.id;
    }
    entity.tenantId = domain.tenantId;
    entity.name = domain.name;
    if (domain.phone) {
      entity.phone = domain.phone;
    }
    if (domain.email) {
      entity.email = domain.email;
    }
    entity.address = domain.address;
    entity.isActive = domain.isActive;
    return entity;
  }
}
