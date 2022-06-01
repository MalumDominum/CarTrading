import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Advertisement } from 'src/advertisement/schemas/advertisement.schema';
import { UserRole } from '../dto/user-role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, index: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({
    get: (fileName: string) => {
      return `${process.env.OBJECT_STORAGE_ROOT_URL}${fileName}`;
    },
    default: '',
  })
  photoPath: string;

  @Prop({ default: Date.now })
  registrationTime: Date;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Advertisement' }],
    default: [],
  })
  likedCars: Advertisement[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Advertisement' }],
    default: [],
  })
  carsForSale: Advertisement[];

  @Prop({
    type: [{ type: Number, enum: UserRole }],
    default: [UserRole.Base],
  })
  roles: number[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', { getters: true });
