import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { JwtSecret } from "src/config/environment";


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {

      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (!roles || roles.length === 0) return true;

      const request = context.switchToHttp().getRequest();
      const bearerToken = request?.headers?.authorization;
      if (!bearerToken) {
        return false;
      }

      const token = bearerToken.slice(7);
      if (!token || !token.length) {
        return false;
      }

      const personal = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      // INFO: personal have on role exited in role.
      request.person = personal;
      return roles.includes(personal.role);
    } catch (error) {
      return false;
    }
  }

}
