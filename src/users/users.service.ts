import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private userRepo: Repository<Users>) {}

  async findOne(email: string): Promise<Users | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async createUser(name: string, email: string, password: string): Promise<Users> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepo.create({ name, email, password: hashedPassword });
    return this.userRepo.save(user);
  }
}
