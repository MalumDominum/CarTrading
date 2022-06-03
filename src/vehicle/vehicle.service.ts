import { HttpService } from '@nestjs/axios';
import { Injectable, ParseIntPipe } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  ModelForMakeIdVehicleType,
  ModelForMake,
  VehicleResponse,
  MakeForVehicleType,
} from './models/model-for-make-id-vehicle-type.model';
import {
  VehicleType,
  VehicleTypeData,
  vehicleTypes,
} from './models/vehicle.model';

@Injectable()
export class VehicleService {
  constructor(private readonly httpService: HttpService) {}

  getVehicleTypes(): VehicleTypeData[] {
    return vehicleTypes;
  }

  async getModelsForMakeIdVehicleType(
    id: ParseIntPipe,
    type: VehicleType,
  ): Promise<VehicleResponse<ModelForMakeIdVehicleType>> {
    const url = `${process.env.VEHICLES_API_URL}/vehicles/GetModelsForMakeIdYear/makeId/${id}/vehicletype/${type}?format=json`;
    const { data } = await firstValueFrom(
      this.httpService.get<VehicleResponse<ModelForMakeIdVehicleType>>(url),
    );
    if (!data) {
      throw new Error(
        `Could not get models for make id ${id} and vehicle type ${type}`,
      );
    }
    if (data.Results.length === 0 || data.Count === 0) {
      throw new Error(
        `No models for make id ${id} and vehicle type ${type} found`,
      );
    }
    return data;
  }

  async getMakesForVehicleType(
    type: VehicleType,
  ): Promise<VehicleResponse<MakeForVehicleType>> {
    const url = `${process.env.VEHICLES_API_URL}/vehicles/GetMakesForVehicleType/${type}?format=json`;
    const { data } = await firstValueFrom(
      this.httpService.get<VehicleResponse<MakeForVehicleType>>(url),
    );
    if (!data) {
      throw new Error(`Could not get makes for ${type} type`);
    }
    if (data.Results.length === 0 || data.Count === 0) {
      throw new Error(`No makes for vehicle type ${type} found`);
    }
    return data;
  }

  async getModelsForMake(make: string): Promise<VehicleResponse<ModelForMake>> {
    const url = `${process.env.VEHICLES_API_URL}/vehicles/GetModelsForMake/${make}/?format=json`;
    const { data } = await firstValueFrom(
      this.httpService.get<VehicleResponse<ModelForMake>>(url),
    );
    if (!data) {
      throw new Error(`Could not get models for make ${make}`);
    }
    if (data.Results.length === 0 || data.Count === 0) {
      throw new Error(`No models for make ${make} found`);
    }
    return data;
  }
}
