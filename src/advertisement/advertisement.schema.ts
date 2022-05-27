import * as mongoose from 'mongoose';
import {
  TechnicalCondition,
  FuelType,
  TransmissionType,
} from './models/advertisement.enums';

export const AdvertisementSchema = new mongoose.Schema({
  id: { type: Number, required: true, index: true },

  makeId: { type: Number, required: true },

  modelId: { type: Number, required: true, index: true },

  vehicleTypeId: { type: Number, required: true },

  // sellingRegion: RegionDto, // { id, name, country: { id, name } }

  productionYear: { type: Number, required: true },

  price: { type: Number, required: true },

  technicalCondition: {
    type: Number,
    enum: TechnicalCondition,
    default: TechnicalCondition.CompletelyUndamaged,
  },

  fuelType: {
    type: Number,
    enum: FuelType,
    required: true,
  },

  transmissionType: {
    type: Number,
    enum: TransmissionType,
    required: true,
  },

  engineCapacity: Number,

  power: Number,

  mileage: { type: Number, required: true },

  seatsNumber: { type: Number, required: true },

  colors: [String],

  photoPaths: {
    type: [String],
    get: (fileNames: string[]) => {
      return fileNames.map((name) => {
        return `${process.env.OBJECT_STORAGE_ROOT_URL}${name}`;
      });
    },
  },

  announcementTime: { type: Date, default: Date.now() },
});

AdvertisementSchema.set('toJSON', { getters: true });
AdvertisementSchema.set('toObject', { getters: true });
