import { HttpService } from '@nestjs/axios';
import { Injectable, ParseIntPipe } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  ModelForMakeIdVehicleType,
  ModelForMake,
  VehicleResponse,
  MakeForVehicleType,
} from './models/model-for-make-id-vehicle-type.model';
import { VehicleType } from './models/vehicle.model';

@Injectable()
export class VehicleService {
  constructor(private readonly httpService: HttpService) {}

  async getModelsForMakeIdVehicleType(
    id: ParseIntPipe,
    type: VehicleType,
  ): Promise<VehicleResponse<ModelForMakeIdVehicleType>> {
    const url = `${process.env.VEHICLES_API_URL}/vehicles/GetModelsForMakeIdYear/makeId/${id}/vehicletype/${type}?format=json`;
    const { data } = await firstValueFrom(
      this.httpService.get<VehicleResponse<ModelForMakeIdVehicleType>>(url),
    );
    return data;
  }

  async getMakesForVehicleType(
    type: VehicleType,
  ): Promise<VehicleResponse<MakeForVehicleType>> {
    const url = `${process.env.VEHICLES_API_URL}/vehicles/GetMakesForVehicleType/${type}?format=json`;
    const { data } = await firstValueFrom(
      this.httpService.get<VehicleResponse<MakeForVehicleType>>(url),
    );
    return data;
  }

  async getModelsForMake(make: string): Promise<VehicleResponse<ModelForMake>> {
    const url = `${process.env.VEHICLES_API_URL}/vehicles/GetModelsForMake/${make}/?format=json`;
    const { data } = await firstValueFrom(
      this.httpService.get<VehicleResponse<ModelForMake>>(url),
    );
    return data;
  }
}
