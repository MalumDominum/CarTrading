import { Injectable } from '@nestjs/common';
import { Car } from './models/car.model';

@Injectable()
export class CarService {
  private cars: Car[] = [
    {
      id: 1,
      make: 'bmw',
      model: 'x5',
      bodyType: 'suv',
      mileage: 50000,
      color: 'white',
      year: 2018,
    },
    {
      id: 2,
      make: 'renault',
      model: 'arkana',
      bodyType: 'suv',
      mileage: 120000,
      color: 'red',
      year: 2017,
    },
    {
      id: 3,
      make: 'mitsubishi',
      model: 'outlander',
      bodyType: 'suv',
      mileage: 200000,
      color: 'black',
      year: 2021,
    },
  ];

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
    this.cars.map((item) => {
      return item.id === id ? { id, ...car } : item;
    });
  }

  delete(id: number) {
    this.cars = this.cars.filter((car) => {
      return car.id !== id;
    });
  }
}
