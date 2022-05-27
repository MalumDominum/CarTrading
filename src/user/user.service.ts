import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private readonly UserModel: Model<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.UserModel.find().exec();
  }

  async getById(id: number): Promise<User> {
    return this.UserModel.findOne((user: User) => {
      return user.id === id;
    }).exec();
  }

  async create(user: User): Promise<User> {
    const createdUser = new this.UserModel(user);
    return createdUser.save();
  }

  async update(id: number, user: User) {
    this.UserModel.updateOne((previous: User) => {
      return previous.id === id ? { id, ...user } : previous;
    });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.UserModel.deleteOne((user: User) => {
      return user.id !== id;
    });
    return result.deletedCount === 1;
  }
}
