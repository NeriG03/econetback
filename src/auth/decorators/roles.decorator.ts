import { SetMetadata } from '@nestjs/common';
import { RolesUsuario } from '../../enums/Roles-Usuarios.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolesUsuario[]) => SetMetadata(ROLES_KEY, roles);