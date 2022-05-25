import {
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Body,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { CarService } from './car.service';
import { Car } from './models/car.model';

@Controller('/cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  getAll(): Car[] {
    return this.carService.getAll();
  }

  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.carService.getById(id);
  }

  @Post()
  create(@Body() car: Car) {
    this.carService.create(car);
  }

  @Put('/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() car: Car) {
    return this.carService.update(id, car);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.carService.delete(id);
  }
}
