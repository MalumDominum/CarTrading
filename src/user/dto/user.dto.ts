import { AdvertisementDto } from 'src/advertisement/dto/advertisement.dto';
import { UserRole } from './user-role.enum';

export class UserDto {
  readonly email: string;

  readonly passwordHash: BinaryData;

  readonly passwordSalt: BinaryData;

  readonly firstName: string;

  readonly lastName: string;

  readonly photoPath: string;

  readonly registrationTime: Date;

  readonly likedCars: AdvertisementDto[];

  readonly carsForSale: AdvertisementDto[];

  readonly role: UserRole;
}
