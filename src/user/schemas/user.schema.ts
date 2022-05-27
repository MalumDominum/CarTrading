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
  passwordHash: Buffer;

  @Prop({ required: true })
  passwordSalt: Buffer;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({
    required: true,
    get: (fileName: string) => {
      return `${process.env.OBJECT_STORAGE_ROOT_URL}${fileName}`;
    },
  })
  photoPath: string;

  @Prop({ default: Date.now })
  registrationTime: Date;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Advertisement' }],
  })
  likedCars: Advertisement[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Advertisement' }],
  })
  carsForSale: Advertisement[];

  @Prop({ enum: UserRole, default: UserRole.Base })
  role: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
