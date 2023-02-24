import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/config/role';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export const PERMISSION_KEY = 'permissions';
export const Permission = (...permission: string[]) => SetMetadata(PERMISSION_KEY, permission);
