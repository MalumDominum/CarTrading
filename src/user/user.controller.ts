import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  LoggerService,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './dto/user-role.enum';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAll(@Req() req) {
    this.logger.log(`Getting all users by user with id - ${req.user.id}`);
    const res = await this.userService.getAll();
    return res;
  }

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:id')
  async getById(@Param('id') id: ObjectId, @Req() req) {
    try {
      this.logger.log(
        `Getting user with id - ${id} by user with id - ${req.user.id}`,
      );
      return await this.userService.getOneById(id);
    } catch (e) {
      this.logger.error(
        `Error while getting user with id - ${id} by user with id - ${req.user.id} - ${e.message}`,
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

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateOneSelf(@Req() req, @Body() user: UpdateUserDto) {
    try {
      this.logger.log(`Updated user with id - ${req.user.id}`);
      return await this.userService.updateOneSelf(req.user.id, user);
    } catch (e) {
      this.logger.error(
        `Error while updating user with id - ${req.user.id} - ${e.message}`,
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

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/:id')
  async update(@Param('id') id: ObjectId, @Body() user: UserDto, @Req() req) {
    try {
      this.logger.log(
        `Updated user with id - ${id} by user with id - ${req.user.id}`,
      );
      return await this.userService.update(id, user);
    } catch (e) {
      this.logger.error(
        `Error while updating user with id - ${id} by user with id - ${req.user.id} - ${e.message}`,
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

  @UseGuards(JwtAuthGuard)
  @Patch('/password/own')
  async updateOwnPassword(@Req() req, @Body() password: UpdatePasswordDto) {
    try {
      this.logger.log(
        `Updated user password for user with id - ${req.user.id}`,
      );
      return await this.userService.updatePassword(
        req.user.id,
        password.password,
      );
    } catch (e) {
      this.logger.error(
        `Error while updating user password for user with id - ${req.user.id} - ${e.message}`,
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

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/password/:id')
  async updatePassword(
    @Param('id') id: ObjectId,
    @Body() password: UpdatePasswordDto,
    @Req() req,
  ) {
    try {
      this.logger.log(
        `Updated user password for user with id - ${id} by user with id - ${req.user.id}`,
      );
      return await this.userService.updatePassword(id, password.password);
    } catch (e) {
      this.logger.error(
        `Error while updating user password for user with id - ${id} by user with id - ${req.user.id} - ${e.message}`,
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

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  async delete(@Param('id') id: ObjectId, @Req() req) {
    try {
      this.logger.log(
        `Deleted user with id - ${id} by user with id - ${req.user.id}`,
      );
      return await this.userService.delete(id);
    } catch (e) {
      this.logger.error(
        `Error while deleting user with id - ${id} by user with id - ${req.user.id}`,
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

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/set-role/:role')
  async setRole(
    @Param('role') role: UserRole,
    @Param('id') id: ObjectId,
    @Req() req,
  ) {
    if (req.user.id === id) {
      throw new HttpException(
        'You cannot set your own role',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      this.logger.log(
        `Setted role ${role} for user with id - ${id} by user with id - ${req.user.id}`,
      );
      return await this.userService.setRole(id, role);
    } catch (e) {
      this.logger.error(
        `Error while setting role ${role} for user with id - ${id} by user with id - ${req.user.id}`,
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

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/unset-role/:role')
  async unsetRole(
    @Param('role') role: UserRole,
    @Param('id') id: ObjectId,
    @Req() req,
  ) {
    if (req.user.id === id) {
      throw new HttpException(
        'You cannot unset your own role',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      this.logger.log(
        `Unsetted role ${role} for user with id - ${id} by user with id - ${req.user.id}`,
      );
      return await this.userService.unsetRole(id, role);
    } catch (e) {
      this.logger.error(
        `Error while unsetting role ${role} for user with id - ${id} by user with id - ${req.user.id}`,
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
}
