import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtAccessTokenGuard } from "./jwt-access.guard";
import { ROLES_KEY } from "src/common/decorators/user/roles.decorator";

@Injectable()
export class RoleGuard extends JwtAccessTokenGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler()
    );
    if (!requiredRoles) {
      return true; // No roles required, allow access
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user; // user is added to the request by JwtAccessTokenGuard
    const hasRole = () =>
      user.roles.some((role: string) => requiredRoles.includes(role));
    if (user && user.roles && hasRole()) {
      return true;
    }
    throw new ForbiddenException("Access denied: insufficient permissions");
  }
}
