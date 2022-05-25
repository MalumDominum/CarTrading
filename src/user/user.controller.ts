import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): User[] {
    return this.userService.getAll();
  }

  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getById(id);
  }

  @Post()
  create(@Body() user: User) {
    this.userService.create(user);
  }

  @Put('/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() user: User) {
    return this.userService.update(id, user);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.userService.delete(id);
  }
}
