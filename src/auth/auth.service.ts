import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user; // Ne pas renvoyer le mot de passe
      return result;
    }
    throw new UnauthorizedException('Email ou mot de passe incorrect');
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(name: string,email: string, password: string) {
    await this.usersService.createUser(name, email, password);
    return { message: 'Utilisateur créé avec succès' };
  }
}
