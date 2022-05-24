import { Injectable } from '@nestjs/common';
import {
  CarType,
  FuelType,
  TechnicalCondition,
  TransmissionType,
} from 'src/car/models/car.enums';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  private getCurrentId = (): number => {
    return this.users.length > 0 ? this.users[this.users.length - 1].id : 0;
  };

  getAll(): User[] {
    return this.users;
  }

  getById(id: number): User {
    return this.users.find((user) => {
      return user.id === id;
    });
  }

  create(user: User) {
    this.users.push({ id: this.getCurrentId() + 1, ...user });
  }

  update(id: number, user: User) {
    this.users = this.users.map((item) => {
      return item.id === id ? { id, ...user } : item;
    });
  }

  delete(id: number) {
    this.users = this.users.filter((user) => {
      return user.id !== id;
    });
  }

  private users: User[] = [
    {
      id: 1,
      email: 'a.buzkov@gmail.com',
      passwordHash: 'xh64*&-:gf#@:¢$vcx',
      passwordSalt: 'cxSjkAiA&(S&DAhJka',
      firstName: 'Alexsandr',
      lastName: 'Buzkov',
      photoPath:
        'http://car-trading.s3-website.eu-east.amazonaws.com/Alexandr-Buzkov-avatar.jpeg',
      registrationTime: new Date('August 19, 2021 23:15:30'),
      likedCars: [
        {
          id: 1,
          model: '3 LR Dual Motor Rest',
          productionYear: 2022,
          price: 57999,
          carType: CarType.Passenger,
          technicalCondition: TechnicalCondition.CompletelyUndamaged,
          fuelType: FuelType.Electro,
          transmissionType: TransmissionType.Automatic,
          engineCapacity: 83,
          power: 345,
          mileage: 3,
          seatsNumber: 5,
          color: 'white',
          photoPaths: [
            'http://car-trading.s3-website.eu-east.amazonaws.com/Tesla-3-LR-Dual-Motor-Rest-body.jpeg',
            'http://car-trading.s3-website.eu-east.amazonaws.com/Tesla-3-LR-Dual-Motor-Rest-salon.jpeg',
          ],
        },
      ],
      carsForSale: [],
      role: 0,
    },
    {
      id: 1,
      email: 'a.korvinets97@gmail.com',
      passwordHash: 'xh64*&-:gf#@:¢$vcx',
      passwordSalt: 'cxSjkAiA&(S&DAhJka',
      firstName: 'Anastatiya',
      lastName: 'Korvinets',
      photoPath:
        'http://car-trading.s3-website.eu-east.amazonaws.com/Anastatiya-Korvinets-avatar.jpeg',
      registrationTime: new Date('May 19, 2022 23:15:30'),
      likedCars: [
        {
          id: 3,
          model: 'Camaro ZL1 FACELIFT',
          productionYear: 2016,
          price: 44999,
          carType: CarType.Passenger,
          technicalCondition: TechnicalCondition.ProfessionallyRepaired,
          fuelType: FuelType.Benzine,
          transmissionType: TransmissionType.SemiAutomatic,
          engineCapacity: 6.2,
          power: 500,
          mileage: 60,
          seatsNumber: 5,
          color: 'red',
          photoPaths: [
            'http://car-trading.s3-website.eu-east.amazonaws.com/Chevrolet-Camaro-ZL1-FACELIFT-body.jpeg',
            'http://car-trading.s3-website.eu-east.amazonaws.com/Chevrolet-Camaro-ZL1-FACELIFT-salon.jpeg',
          ],
        },
      ],
      carsForSale: [
        {
          id: 2,
          model: 'Outlander XL 3.0ROKFORD',
          productionYear: 2007,
          price: 8200,
          carType: CarType.Passenger,
          technicalCondition: TechnicalCondition.Repaired,
          fuelType: FuelType.Diesel,
          transmissionType: TransmissionType.Manual,
          engineCapacity: 3,
          power: null,
          mileage: 180,
          seatsNumber: 5,
          color: 'gray',
          photoPaths: [
            'http://car-trading.s3-website.eu-east.amazonaws.com/Mistubishi-Outlander-XL-3.0ROKFORD-body.jpeg',
            'http://car-trading.s3-website.eu-east.amazonaws.com/Mistubishi-Outlander-XL-3.0ROKFORD-salon.jpeg',
          ],
        },
      ],
      role: 1,
    },
  ];
}
