import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { User } from 'src/core/user/entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const validRoles = this.reflector.getAllAndOverride<string[]>(META_ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!validRoles || validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) {
      throw new BadRequestException('User not found in request');
    }

    if (!user.role) {
      throw new BadRequestException('User does not have a role assigned');
    }

    const hasRole = validRoles.includes(user.role);

    if (!hasRole) {
      throw new ForbiddenException(
        `User ${user.name} requires one of the following roles: [${validRoles.join(', ')}]`,
      );
    }

    return true;
  }
}
