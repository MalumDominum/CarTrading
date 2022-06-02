import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
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
  constructor(private readonly userService: UserService) {}

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAll() {
    const res = await this.userService.getAll();
    return res;
  }

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:id')
  async getById(@Param('id') id: ObjectId) {
    try {
      return await this.userService.getOneById(id);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.Base, UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch()
  async updateOneSelf(@Req() req, @Body() user: UpdateUserDto) {
    try {
      return await this.userService.updateOneSelf(req.user.id, user);
    } catch (e) {
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
  async update(@Param('id') id: ObjectId, @Body() user: UserDto) {
    try {
      return await this.userService.update(id, user);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.Base, UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/password/own')
  async updateOwnPassword(@Req() req, @Body() password: UpdatePasswordDto) {
    try {
      return await this.userService.updatePassword(
        req.user.id,
        password.password,
      );
    } catch (e) {
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
  ) {
    try {
      return await this.userService.updatePassword(id, password.password);
    } catch (e) {
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
  async delete(@Param('id') id: ObjectId) {
    try {
      return await this.userService.delete(id);
    } catch (e) {
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
      return await this.userService.setRole(id, role);
    } catch (e) {
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
      return await this.userService.unsetRole(id, role);
    } catch (e) {
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
