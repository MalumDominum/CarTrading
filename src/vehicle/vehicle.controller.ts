// eslint-disable-next-line object-curly-newline
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  LoggerService,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { VehicleService } from './vehicle.service';
import { VehicleType, VehicleTypeData } from './models/vehicle.model';
import {
  MakeForVehicleType,
  ModelForMake,
  ModelForMakeIdVehicleType,
} from './models/model-for-make-id-vehicle-type.model';

@Controller('/vehicle')
export class VehicleController {
  constructor(
    private readonly vehicleService: VehicleService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Get('/types')
  getVehicleTypes(): VehicleTypeData[] {
    return this.vehicleService.getVehicleTypes();
  }

  @Get(':type')
  async getMakesForVehicleType(
    @Param('type') type: VehicleType,
  ): Promise<MakeForVehicleType[]> {
    try {
      return (await this.vehicleService.getMakesForVehicleType(type)).Results;
    } catch (e) {
      this.logger.error(
        `Error while getting makes for vehicle type ${type} - ${e}`,
      );
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('make/:make')
  async getModelsForMake(@Param('make') make: string): Promise<ModelForMake[]> {
    try {
      return (await this.vehicleService.getModelsForMake(make)).Results;
    } catch (e) {
      this.logger.error(`Error while getting models for make ${make} - ${e}`);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/:type')
  async getModelsForMakeIdVehicleType(
    @Param('id') id: ParseIntPipe,
    @Param('type') type: VehicleType,
  ): Promise<ModelForMakeIdVehicleType[]> {
    try {
      return (await this.vehicleService.getModelsForMakeIdVehicleType(id, type))
        .Results;
    } catch (e) {
      this.logger.error(
        `Error while getting models for make id ${id} and vehicle type ${type} - ${e}`,
      );
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
