import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;
    
    // Verificar si el usuario ya existe
    const userExists = await this.usersService.findByEmail(email);
    if (userExists) {
      throw new BadRequestException('El correo electrónico ya está registrado');
    }

    // Encriptar la contraseña
    const hashedPassword = await this.hashPassword(password);

    // Crear el usuario
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    // Generar token JWT
    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
      },
      token,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Buscar el usuario por email
    const user = await this.usersService.findByEmail(email, true);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Verificar si el usuario está activo
    if (!user.activo) {
      throw new UnauthorizedException('Usuario inactivo, contacte al administrador');
    }

    // Verificar la contraseña
    const isPasswordValid = await this.comparePasswords(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Generar token JWT
    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
      },
      token,
    };
  }

  private generateToken(user: any) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    return this.jwtService.sign(payload);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  private async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}