export class User {
  readonly id: number;

  readonly email: string;

  readonly passwordHash: string;

  readonly passwordSalt: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly photoPath: string;

  readonly registrationTime: string;

  readonly likedCars: string[];

  readonly carsForSale: string[];

  readonly role: number;
}
