import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {

      const permission = this.reflector.get<string>('permission', context.getHandler());
      if (!permission) return true;


      const request = context.switchToHttp().getRequest();
      const bearerToken = request?.headers?.authorization;
      if (!bearerToken) {
        return false;
      }

      const token = bearerToken.slice(7);
      if (!token || !token.length) {
        return false;
      }

      const user = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      // INFO: personal have on role exited in role.
      request.user = user;
      return user?.permissions.includes(permission) || user?.permissions.includes('all');
    } catch (error) {
      return false;
    }
  }

}
