import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { tenantContext } from './tenant-context';

export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'] as string;
    if (!tenantId) {
      throw new Error('Missing x-tenant-id');
    }
    tenantContext.run({ tenantId }, () => {
      next();
    });
  }
}
