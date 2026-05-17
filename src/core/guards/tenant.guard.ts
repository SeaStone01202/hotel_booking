import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRE_TENANT_KEY } from '../decorators/tenant.decorator';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireTenant = this.reflector.getAllAndOverride<boolean>(
      REQUIRE_TENANT_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requireTenant) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (!user?.tenantId) {
      throw new ForbiddenException('Tenant required');
    }

    return true;
  }
}
