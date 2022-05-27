import { Document } from 'mongoose';
import {
  TechnicalCondition,
  FuelType,
  TransmissionType,
} from './advertisement.enums';

export class Advertisement extends Document {
  readonly id: number;

  readonly makeId: number;

  readonly modelId: number;

  readonly vehicleTypeId: number;

  // readonly sellingRegion: RegionDto; // { id; name; country: { id; name } }

  readonly productionYear: number;

  readonly price: number;

  readonly technicalCondition: TechnicalCondition;

  readonly fuelType: FuelType;

  readonly transmissionType: TransmissionType;

  readonly engineCapacity: number;

  readonly power: number;

  readonly mileage: number;

  readonly seatsNumber: number;

  readonly colors: string[];

  readonly photoPaths: string[];

  readonly announcementTime: Date;
}
