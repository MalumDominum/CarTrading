import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      email: 'email@email.com',
      passwordHash: 'xh64*&-:gf#@:¢$vcx',
      passwordSalt: 'xh64*&-:gf#@:¢$vcx',
      firstName: 'Alexsandr',
      lastName: 'Buzkov',
      photoPath: '',
      registrationTime: Date.now().toString(),
      likedCars: ['1', '3'],
      carsForSale: ['2'],
      role: 0,
    },
  ];

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
}
