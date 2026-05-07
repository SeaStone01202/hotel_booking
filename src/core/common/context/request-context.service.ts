import { Injectable } from '@nestjs/common';
import { tenantContext } from './tenant-context';

@Injectable()
export class RequestContextService {
  static getTenantId() {
    const store = tenantContext.getStore();
    if (!store) {
      throw new Error('Tenant not found');
    }
    return store.tenantId;
  }
}
