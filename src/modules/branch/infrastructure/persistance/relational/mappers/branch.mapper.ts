import { BranchEntity } from '../entities/branch.entity';
import { Branch } from '../domain/branch.domain';

export class BranchMapper {
  static toDomain(entity: BranchEntity): Branch {
    return new Branch({
      id: entity.id,
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
    return entity;
  }
}
