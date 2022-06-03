import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { AdvertisementDto } from './dto/advertisement.dto';
import {
  Advertisement,
  AdvertisementDocument,
} from './schemas/advertisement.schema';

@Injectable()
export class AdvertisementService {
  constructor(
    @InjectModel(Advertisement.name)
    private readonly advertisementModel: Model<Advertisement>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<Advertisement[]> {
    const ads = await this.advertisementModel.find();
    if (!ads) {
      throw new Error("Couldn't load ads");
    }
    return ads;
  }

  async findOne(id: ObjectId): Promise<Advertisement> {
    const ad = await this.advertisementModel.findById(id);
    if (!ad) {
      throw new Error('Advertisement not found');
    }
    return ad;
  }

  async findUserAds(userId: ObjectId): Promise<Advertisement[]> {
    const ads = await this.userModel.findById(userId).populate('carsForSale');
    if (!ads) {
      throw new Error("Couldn't load ads");
    }
    return ads.carsForSale;
  }

  async findUserLikedAds(userId: ObjectId): Promise<Advertisement[]> {
    const ads = await this.userModel.findById(userId).populate('likedCars');
    if (!ads) {
      throw new Error("Couldn't load ads");
    }
    return ads.likedCars;
  }

  async create(
    createAdvertisementDto: AdvertisementDto,
    userId: ObjectId,
  ): Promise<AdvertisementDocument> {
    const user = await this.userModel.findById(userId);
    const ad = await this.advertisementModel.create(createAdvertisementDto);
    if (!user || !ad) {
      throw new Error('Error while creating advertisement');
    }
    user.carsForSale.push(ad);
    await user.save();
    return ad;
  }

  async update(
    id: ObjectId,
    updateAdvertisementDto: AdvertisementDto,
    userId: ObjectId,
  ): Promise<Advertisement> {
    const ad = await this.advertisementModel.findById(id);
    if (!ad) {
      throw new Error('Advertisement not found');
    }
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.carsForSale.includes(ad.id)) {
      throw new Error('You are not allowed to update this advertisement');
    }
    const newAd = await this.advertisementModel.findByIdAndUpdate(
      id,
      { ...updateAdvertisementDto },
      { new: true },
    );
    return newAd;
  }

  async remove(id: ObjectId): Promise<mongoose.Types.ObjectId> {
    const ad = await this.advertisementModel.findByIdAndDelete(id);
    // eslint-disable-next-line no-underscore-dangle
    return ad._id;
  }

  async removeMany(ids: ObjectId[]): Promise<number> {
    const ads = await this.advertisementModel.deleteMany({
      _id: { $in: ids },
    });
    return ads.deletedCount;
  }

  async removeUsersAd(
    adId: ObjectId,
    userId: ObjectId,
  ): Promise<AdvertisementDocument[]> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    if (
      !user.carsForSale.find((car) => {
        return car._id.toString() === adId.toString();
      })
    ) {
      throw new Error('You are not allowed to delete this advertisement');
    }
    user.carsForSale = user.carsForSale.filter((car) => {
      return car._id.toString() !== adId.toString();
    });
    await user.save();
    await this.remove(adId);
    return user.carsForSale;
  }

  async likeAd(
    userId: ObjectId,
    adId: ObjectId,
  ): Promise<AdvertisementDocument[]> {
    const user = await this.userModel.findById(userId);
    const ad = await this.advertisementModel.findById(adId);
    if (!user || !ad) {
      throw new Error('Error while adding car to liked cars');
    }
    user.likedCars.push(ad);
    await user.save();
    return user.likedCars;
  }

  async removeLikedAd(
    adId: ObjectId,
    userId: ObjectId,
  ): Promise<AdvertisementDocument[]> {
    const user = await this.userModel.findById(userId).populate('likedCars');
    if (!user) {
      throw new Error('User not found');
    }
    user.likedCars = user.likedCars.filter((car) => {
      return car._id.toString() !== adId.toString();
    });
    await user.save();
    return user.likedCars;
  }
}
