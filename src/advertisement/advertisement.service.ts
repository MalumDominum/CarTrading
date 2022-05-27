/* eslint operator-linebreak: "off" */
import { Injectable } from '@nestjs/common';
import {
  FuelType,
  TechnicalCondition,
  TransmissionType,
} from './models/advertisement.enums';
import { Advertisement } from './models/advertisement.model';

@Injectable()
export class AdvertisementService {
  private getCurrentId = (): number => {
    return this.advertisements.length > 0
      ? this.advertisements[this.advertisements.length - 1].id
      : 0;
  };

  getAll(): Advertisement[] {
    return this.advertisements;
  }

  getById(id: number): Advertisement {
    return this.advertisements.find((car) => {
      return car.id === id;
    });
  }

  create(car: Advertisement) {
    this.advertisements.push({ id: this.getCurrentId() + 1, ...car });
  }

  update(id: number, car: Advertisement) {
    this.advertisements = this.advertisements.map((item) => {
      return item.id === id ? { id, ...car } : item;
    });
  }

  delete(id: number) {
    this.advertisements = this.advertisements.filter((car) => {
      return car.id !== id;
    });
  }

  private advertisements: Advertisement[] = [
    {
      id: 1,
      makeId: 31,
      modelId: 441,
      productionYear: 2022,
      price: 57999,
      vehicleTypeId: 2,
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
      makeId: 31,
      modelId: 441,
      productionYear: 2007,
      price: 8200,
      vehicleTypeId: 2,
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
      makeId: 31,
      modelId: 441,
      productionYear: 2016,
      price: 44999,
      vehicleTypeId: 2,
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
