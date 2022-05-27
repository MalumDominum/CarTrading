// eslint-disable-next-line object-curly-newline
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleType, VehicleTypeData } from './models/vehicle.model';
import {
  MakeForVehicleType,
  ModelForMake,
  ModelForMakeIdVehicleType,
} from './models/model-for-make-id-vehicle-type.model';

@Controller('/vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get('/types')
  getVehicleTypes(): VehicleTypeData[] {
    return this.vehicleService.getVehicleTypes();
  }

  @Get(':type')
  async getMakesForVehicleType(
    @Param('type') type: VehicleType,
  ): Promise<MakeForVehicleType[]> {
    return (await this.vehicleService.getMakesForVehicleType(type)).Results;
  }

  @Get('by-make/:make')
  async getModelsForMake(@Param('make') make: string): Promise<ModelForMake[]> {
    return (await this.vehicleService.getModelsForMake(make)).Results;
  }

  @Get(':makeId/:type')
  async getModelsForMakeIdVehicleType(
    @Param('makeId') id: ParseIntPipe,
    @Param('type') type: VehicleType,
  ): Promise<ModelForMakeIdVehicleType[]> {
    return (await this.vehicleService.getModelsForMakeIdVehicleType(id, type))
      .Results;
  }
}
