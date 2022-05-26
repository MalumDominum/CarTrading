import { Advertisement } from 'src/advertisement/models/advertisement.model';

export class User {
  readonly id: number;

  readonly email: string;

  readonly passwordHash: string;

  readonly passwordSalt: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly photoPath: string;

  readonly registrationTime: Date;

  readonly likedCars: Advertisement[];

  readonly carsForSale: Advertisement[];

  readonly role: number;
}
