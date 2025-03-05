import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { RolesUsuarios } from "src/enums/Roles-Usuarios.enum";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword(
        { minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 1 }
    )
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(RolesUsuarios)
    rol: RolesUsuarios; // Cambiado a string para evitar problemas de importación de enums

    @IsOptional()
    @IsBoolean()
    isActive: boolean;

    @IsOptional()
    createdAt: Date;

    @IsOptional()
    updatedAt: Date;

    @IsOptional()
    puntos: number;
}
