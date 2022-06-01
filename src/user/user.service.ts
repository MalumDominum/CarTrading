import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { RegistrationDto } from 'src/auth/dto/auth.dto';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async getOneById(id: ObjectId): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async create(user: RegistrationDto): Promise<UserDocument> {
    const res = await this.userModel.create({
      ...user,
      passwordHash: user.password,
    });
    return res;
  }

  async update(id: ObjectId, user: UserDto): Promise<User> {
    const res = await this.userModel.findByIdAndUpdate(
      id,
      {
        ...user,
      },
      { new: true },
    );
    await res.save();
    return res;
  }

  async delete(id: ObjectId): Promise<mongoose.Types.ObjectId> {
    const user = await this.userModel.findByIdAndDelete(id);
    // eslint-disable-next-line no-underscore-dangle
    return user._id;
  }

  async getOneByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });
    return user;
  }
}
