import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';

@Module({
  imports: [HttpModule],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
