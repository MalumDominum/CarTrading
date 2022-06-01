import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { RegistrationDto } from 'src/auth/dto/auth.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: ObjectId) {
    return this.userService.getOneById(id);
  }

  @Post()
  create(@Body() user: RegistrationDto) {
    this.userService.create(user);
  }

  @Patch('/:id')
  update(@Param('id') id: ObjectId, @Body() user: UserDto) {
    return this.userService.update(id, user);
  }

  @Delete('/:id')
  delete(@Param('id') id: ObjectId) {
    this.userService.delete(id);
  }

  @Get('/email/:email')
  getByEmail(@Param('email') email: string) {
    return this.userService.getOneByEmail(email);
  }
}
