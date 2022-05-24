import { Injectable } from '@nestjs/common';
import {
  CarType,
  FuelType,
  TechnicalCondition,
  TransmissionType,
} from './models/car.enums';
import { Car } from './models/car.model';

@Injectable()
export class CarService {
  private getCurrentId = (): number => {
    return this.cars.length > 0 ? this.cars[this.cars.length - 1].id : 0;
  };

  getAll(): Car[] {
    return this.cars;
  }

  getById(id: number): Car {
    return this.cars.find((car) => {
      return car.id === id;
    });
  }

  create(car: Car) {
    this.cars.push({ id: this.getCurrentId() + 1, ...car });
  }

  update(id: number, car: Car) {
    this.cars = this.cars.map((item) => {
      return item.id === id ? { id, ...car } : item;
    });
  }

  delete(id: number) {
    this.cars = this.cars.filter((car) => {
      return car.id !== id;
    });
  }

  private cars: Car[] = [
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
  ];
}
