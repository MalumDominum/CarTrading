import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CarService } from './car.service';
import { CarController } from './car.controller';

@Module({
  imports: [HttpModule],
  providers: [CarService],
  controllers: [CarController],
})
export class CarModule {}
