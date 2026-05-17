import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_AUTH_KEY } from '../decorators/auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isAuth = this.reflector.getAllAndOverride<boolean>(IS_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!isAuth) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const token = authHeader.split(' ')[1];

    const payload = this.jwtService.verify(token);

    request.user = payload;

    return true;
  }
}
