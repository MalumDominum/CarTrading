// eslint-disable-next-line object-curly-newline
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleType } from './models/vehicle.model';
import {
  MakeForVehicleType,
  ModelForMake,
  ModelForMakeIdVehicleType,
} from './models/model-for-make-id-vehicle-type.model';

@Controller('/vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get(':type')
  async getMakesForVehicleType(
    @Param('type') type: VehicleType,
  ): Promise<MakeForVehicleType[]> {
    return (await this.vehicleService.getMakesForVehicleType(type)).Results;
  }

  @Get('make/:make')
  async getModelsForMake(@Param('make') make: string): Promise<ModelForMake[]> {
    return (await this.vehicleService.getModelsForMake(make)).Results;
  }

  @Get(':id/:type')
  async getModelsForMakeIdVehicleType(
    @Param('id') id: ParseIntPipe,
    // eslint-disable-next-line @typescript-eslint/indent
    @Param('type') type: VehicleType,
  ): Promise<ModelForMakeIdVehicleType[]> {
    return (await this.vehicleService.getModelsForMakeIdVehicleType(id, type))
      .Results;
  }
}
