export interface JwtPayload {
  sub: number;    // ID del usuario
  email: string;  // Email del usuario
  roles?: string[]; // Roles del usuario (opcional)
}