import { VehicleTypeData } from './vehicle.model';

export type VehicleResponse<T> = {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: T[];
};
export type ModelForMake = {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
};
export type MakeForVehicleType = {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
};

export type ModelForMakeIdVehicleType = ModelForMake & VehicleTypeData;
