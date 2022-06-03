import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { jwtConstants } from './constants';
import { Token } from './schema/token.schema';
import { LoginDto, RegistrationDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectModel(Token.name) private readonly tokenModel: Model<Token>,
  ) {}

  async login(user: LoginDto) {
    const candidate = await this.userService.getOneByEmail(user.email);
    if (!candidate) {
      throw new Error(`User with email ${user.email} does not exist`);
    }
    const isPasswordValid = await bcrypt.compare(
      user.password,
      candidate.passwordHash,
    );
    if (!isPasswordValid) {
      throw new Error(`Invalid password`);
    }
    const tokens = this.generateTokens(
      candidate._id.toString(),
      candidate.email,
    );
    await this.saveToken(candidate._id.toString(), tokens.refreshToken);
    return {
      ...tokens,
      user: candidate.toObject(),
    };
  }

  async logout(refreshToken: string) {
    const token = await this.removeToken(refreshToken);
    return token;
  }

  async registration(user: RegistrationDto) {
    const candidate = await this.userService.getOneByEmail(user.email);
    if (candidate) {
      throw new Error(`User with email ${user.email} already exists`);
    }
    const passwordHash = await bcrypt.hash(user.password, 10);

    const newUser = await this.userService.create({
      ...user,
      password: passwordHash,
    });
    const tokens = this.generateTokens(newUser._id, newUser.email);
    await this.saveToken(newUser._id.toString(), tokens.refreshToken);
    return {
      ...tokens,
      user: newUser.toObject(),
    };
  }

  generateTokens(userId: string, email: string) {
    const user = { userId, email };
    const accessToken = this.jwtService.sign(user, {
      secret: jwtConstants.secret,
      expiresIn: '30m',
    });
    const refreshToken = this.jwtService.sign(user, {
      secret: jwtConstants.secretRefresh,
      expiresIn: '30d',
    });
    return { accessToken, refreshToken };
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await this.tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const newToken = await this.tokenModel.create({
      user: userId,
      refreshToken,
    });
    return newToken;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await this.tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new Error('No refresh token');
    }
    const userData = this.validateToken(
      refreshToken,
      jwtConstants.secretRefresh,
    );
    const tokenFromDb = await this.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw new Error('Invalid refresh token');
    }
    const candidate = await this.userService.getOneById(userData.userId);
    const tokens = this.generateTokens(
      candidate._id.toString(),
      candidate.email,
    );
    await this.saveToken(candidate._id.toString(), tokens.refreshToken);
    return {
      ...tokens,
      user: candidate.toObject(),
    };
  }

  validateToken(token: string, secret: string) {
    try {
      const userData = this.jwtService.verify(token, {
        secret,
      });
      return userData;
    } catch (error) {
      return null;
    }
  }

  async findToken(token: string) {
    const tokenData = await this.tokenModel.findOne({ refreshToken: token });
    return tokenData;
  }
}
