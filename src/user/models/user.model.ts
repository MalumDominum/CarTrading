import { Document } from 'mongoose';
import { Advertisement } from 'src/advertisement/models/advertisement.model';
import { UserRole } from './user-role.enum';

export class User extends Document {
  readonly id: number;

  readonly email: string;

  readonly passwordHash: BinaryData;

  readonly passwordSalt: BinaryData;

  readonly firstName: string;

  readonly lastName: string;

  readonly photoPath: string;

  readonly registrationTime: Date;

  readonly likedCars: Advertisement[];

  readonly carsForSale: Advertisement[];

  readonly role: UserRole;
}
