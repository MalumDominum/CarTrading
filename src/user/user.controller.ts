import {
  Body,
  Controller,
  Delete,
  Get,
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
  getAll() {
    return this.userService.getAll();
  }

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:id')
  getById(@Param('id') id: ObjectId) {
    return this.userService.getOneById(id);
  }

  @Roles(UserRole.Base, UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch()
  updateOneSelf(@Req() req, @Body() user: UpdateUserDto) {
    return this.userService.updateOneSelf(req.user.id, user);
  }

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/:id')
  update(@Param('id') id: ObjectId, @Body() user: UserDto) {
    return this.userService.update(id, user);
  }

  @Roles(UserRole.Base, UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/password/own')
  updateOwnPassword(@Req() req, @Body() password: UpdatePasswordDto) {
    return this.userService.updatePassword(req.user.id, password.password);
  }

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/password/:id')
  updatePassword(
    @Param('id') id: ObjectId,
    @Body() password: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(id, password.password);
  }

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  delete(@Param('id') id: ObjectId) {
    this.userService.delete(id);
  }
}
