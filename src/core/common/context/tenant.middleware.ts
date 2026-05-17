import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { tenantContext } from './tenant-context';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Skip tenant validation for auth routes
    if (req.path.includes('/auth/')) {
      return next();
    }

    // Priority 1: Extract tenantId from JWT (no verify, just decode)
    let tenantId: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      try {
        const decoded = this.jwtService.decode(token) as {
          tenantId?: string;
        } | null;
        if (decoded?.tenantId) {
          tenantId = decoded.tenantId;
        }
      } catch {
        // Invalid JWT — fall through to other sources
      }
    }

    // Priority 2: Fallback to x-tenant-id header
    if (!tenantId) {
      tenantId = req.headers['x-tenant-id'] as string | undefined;
    }

    // Priority 3: Fallback to subdomain (for future deployed envs)
    if (!tenantId) {
      const host = req.hostname;
      const parts = host?.split('.');
      if (parts && parts.length >= 2 && parts[0] !== 'www') {
        tenantId = parts[0]; // Subdomain treated as tenant subdomain
      }
    }

    if (!tenantId) {
      throw new Error('Missing tenant context');
    }

    tenantContext.run({ tenantId }, () => {
      next();
    });
  }
}
