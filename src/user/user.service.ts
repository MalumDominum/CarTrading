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
    return this.UserModel.find();
  }

  async getById(userId: number): Promise<User> {
    return this.UserModel.findOne({ id: userId });
  }

  async create(user: User): Promise<User> {
    const createdUser = new this.UserModel(user);
    return createdUser.save();
  }

  async update(userId: number, user: User) {
    return this.UserModel.updateOne({ id: userId }, user);
  }

  async delete(userId: number) {
    return this.UserModel.deleteOne({ id: userId });
  }
}
