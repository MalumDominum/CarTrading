import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  FuelType,
  TechnicalCondition,
  TransmissionType,
} from '../dto/advertisement.enums';

export type AdvertisementDocuments = Document & Advertisement;

@Schema()
export class Advertisement {
  @Prop({ required: true })
  makeId: number;

  @Prop({ required: true, index: true })
  modelId: number;

  @Prop({ required: true })
  vehicleTypeId: number;

  @Prop({ required: true })
  productionYear: number;

  @Prop({ required: true })
  price: number;

  @Prop({
    enum: TechnicalCondition,
    default: TechnicalCondition.CompletelyUndamaged,
  })
  technicalCondition: number;

  @Prop({ required: true, enum: FuelType })
  fuelType: number;

  @Prop({ required: true, enum: TransmissionType })
  transmissionType: number;

  @Prop()
  engineCapacity: number;

  @Prop()
  power: number;

  @Prop({ required: true })
  mileage: number;

  @Prop({ required: true })
  seatsNumber: number;

  @Prop([String])
  colors: string[];

  @Prop({
    type: [String],
    get: (fileNames: string[]) => {
      return fileNames.map((name) => {
        return `${process.env.OBJECT_STORAGE_ROOT_URL}${name}`;
      });
    },
  })
  photoPaths: string[];

  @Prop({ default: Date.now })
  announcementTime: Date;
}

export const AdvertisementSchema = SchemaFactory.createForClass(Advertisement);
