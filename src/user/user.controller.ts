import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { UserRole } from './dto/user-role.enum';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:id')
  getById(@Param('id') id: ObjectId) {
    return this.userService.getOneById(id);
  }

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/:id')
  update(@Param('id') id: ObjectId, @Body() user: UserDto) {
    return this.userService.update(id, user);
  }

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  delete(@Param('id') id: ObjectId) {
    this.userService.delete(id);
  }
}
