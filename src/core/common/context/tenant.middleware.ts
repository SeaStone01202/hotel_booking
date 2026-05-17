import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { tenantContext } from './tenant-context';

export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Skip tenant validation for auth routes
    if (req.path.includes('/auth/')) {
      return next();
    }

    const tenantId = req.headers['x-tenant-id'] as string;
    if (!tenantId) {
      throw new Error('Missing x-tenant-id');
    }
    tenantContext.run({ tenantId }, () => {
      next();
    });
  }
}
