import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { RequestContextService } from '../context/request-context.service';
import { BaseTenantEntity } from './base-tenant-entity';

export class TenantRepository<
  T extends BaseTenantEntity,
> extends Repository<T> {
  private getTenantId() {
    return RequestContextService.getTenantId();
  }

  find(options?: FindManyOptions<T>) {
    return super.find({
      ...options,
      where: {
        ...(options?.where as any),
        tenantId: this.getTenantId(),
      },
    });
  }

  findOne(options: FindOneOptions<T>) {
    return super.findOne({
      ...options,
      where: {
        ...(options?.where as any),
        tenantId: this.getTenantId(),
      },
    });
  }
}
