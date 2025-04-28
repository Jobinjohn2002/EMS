import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOneBy({ email });
    // if (user && (await bcrypt.compare(password, user.password))) {
    if (user ) {
      const payload = { email: user.email, sub: user.id };
      return this.jwtService.sign(payload);
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
