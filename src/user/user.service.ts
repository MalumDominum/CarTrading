import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { RegistrationDto } from 'src/auth/dto/auth.dto';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './dto/user-role.enum';

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
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async create(user: RegistrationDto): Promise<UserDocument> {
    const res = await this.userModel.create({
      ...user,
      roles: [UserRole.Base],
      passwordHash: user.password,
    });
    return res;
  }

  async update(id: ObjectId, user: UserDto): Promise<User> {
    if (Object.keys(user).length === 0) {
      throw new Error('data to update is empty');
    }
    const res = await this.userModel.findByIdAndUpdate(
      id,
      {
        ...user,
      },
      { new: true },
    );
    if (!res) {
      throw new Error('User not found');
    }
    await res.save();
    return res;
  }

  async updateOneSelf(id: ObjectId, updateData: UpdateUserDto): Promise<User> {
    const res = await this.userModel.findByIdAndUpdate(
      id,
      { ...updateData },
      { new: true },
    );
    await res.save();
    return res;
  }

  async updatePassword(id: ObjectId, password: string): Promise<UserDocument> {
    const newPassHash = await bcrypt.hash(password, 10);
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    if (bcrypt.compare(user.passwordHash, newPassHash)) {
      throw new Error('New password is the same as old one');
    }
    user.passwordHash = newPassHash;
    await user.save();
    return user;
  }

  async delete(id: ObjectId): Promise<mongoose.Types.ObjectId> {
    const user = await this.userModel
      .findById(id)
      .populate('carsForSale')
      .then(async (u) => {
        u.carsForSale.map(async (car) => {
          await car.remove();
        });
        return u;
      })
      .then((item) => {
        return item.remove();
      });
    if (!user) {
      throw new Error('User not found');
    }
    // eslint-disable-next-line no-underscore-dangle
    return user._id;
  }

  async getOneByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async setRole(id: ObjectId, role: UserRole): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    if (!UserRole[role]) {
      throw new Error(`Role ${role} does not exist`);
    }

    if (user.roles.includes(role)) {
      throw new Error(`User already has ${UserRole[role].toLowerCase()} role`);
    }
    user.roles.push(role);
    await user.save();
    return user;
  }

  async unsetRole(id: ObjectId, role: UserRole): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    const userRole = +role;

    if (userRole === UserRole.Base) {
      throw new Error('You can not unset base role');
    }
    if (!user.roles.includes(userRole)) {
      throw new Error(
        `User does not have ${UserRole[userRole].toLowerCase()} role`,
      );
    }

    user.roles = user.roles.filter((r) => {
      return r !== userRole;
    });

    await user.save();
    return user;
  }
}
