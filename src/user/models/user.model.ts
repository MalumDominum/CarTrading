import { Car } from 'src/car/models/car.model';

export class User {
  readonly id: number;

  readonly email: string;

  readonly passwordHash: string;

  readonly passwordSalt: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly photoPath: string;

  readonly registrationTime: Date;

  readonly likedCars: Car[];

  readonly carsForSale: Car[];

  readonly role: number;
}
