import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserDto> {
    const user = await this.usersService.getOneByEmail(email);
    if (user && user.passwordHash.toString() === pass) {
      const { passwordHash, ...result } = user;
      return { ...result };
    }
    return null;
  }

  async login(user: any) {
    // eslint-disable-next-line no-underscore-dangle
    const payload = { username: user.email, sub: user._id.toString() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
