import * as mongoose from 'mongoose';
import { AdvertisementSchema } from 'src/advertisement/advertisement.schema';
import { UserRole } from './models/user-role.enum';

export const UserSchema = new mongoose.Schema({
  id: { type: Number, required: true, index: true },

  email: { type: String, required: true, index: true },

  passwordHash: { type: Buffer, required: true },

  passwordSalt: { type: Buffer, required: true },

  firstName: { type: String, required: true },

  lastName: { type: String, required: true },

  photoPath: {
    type: String,
    get: (fileName: string) => {
      return `${process.env.OBJECT_STORAGE_ROOT_URL}${fileName}`;
    },
  },

  registrationTime: { type: Date, default: Date.now() },

  likedCars: [AdvertisementSchema],

  carsForSale: [AdvertisementSchema],

  role: {
    type: Number,
    enum: UserRole,
    get: (enumValue: number) => {
      return UserRole[enumValue];
    },
    set: (enumValue: UserRole) => {
      return UserRole[enumValue];
    },
    default: UserRole.Base,
  },
});
