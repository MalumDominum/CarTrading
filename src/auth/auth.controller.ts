// eslint-disable-next-line object-curly-newline
import {
  Controller,
  Post,
  Body,
  Res,
  HttpException,
  HttpStatus,
  Req,
  LoggerService,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AuthService } from './auth.service';
import { LoginDto, RegistrationDto } from './dto/auth.dto';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Post('/login')
  async login(@Body() user: LoginDto, @Res() res: Response) {
    try {
      this.logger.log(`Login user with email ${user.email}`);
      const userData = await this.authService.login(user);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      this.logger.error(
        `Error login user with email ${user.email} - ${e.message}`,
      );
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/register')
  async register(@Body() user: RegistrationDto, @Res() res: Response) {
    try {
      this.logger.log(`Register user with email ${user.email}`);
      const registeredUser = await this.authService.registration(user);
      res.cookie('refreshToken', registeredUser.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(registeredUser);
    } catch (e) {
      this.logger.error(
        `Error register user with email ${user.email} - ${e.message}`,
      );
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/logout')
  async logout(@Res() res: Response, @Req() req: Request) {
    try {
      this.logger.log('Logout user');
      const { refreshToken } = req.cookies;
      const token = await this.authService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      this.logger.error(`Error logout user - ${e.message}`);
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: e.message,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('/refresh')
  async refresh(@Res() res: Response, @Req() req: Request) {
    try {
      this.logger.log('Refresh token');
      const { refreshToken } = req.cookies;
      const userData = await this.authService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      this.logger.error(`Error while refreshing the token - ${e.message}`);
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: e.message,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
