import {
  FuelType,
  TechnicalCondition,
  TransmissionType,
} from './advertisement.enums';

export class Advertisement {
  id: number;

  makeId: number;

  modelId: number;

  vehicleTypeId: number;

  // sellingRegion: RegionDto; // { id, name, country: { id, name } }

  productionYear: number;

  price: number;

  technicalCondition: TechnicalCondition;

  fuelType: FuelType;

  transmissionType: TransmissionType;

  engineCapacity: number;

  power: number;

  mileage: number;

  seatsNumber: number;

  color: string;

  photoPaths: string[];
}
