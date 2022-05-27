/* eslint operator-linebreak: "off" */
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Advertisement } from './models/advertisement.model';

@Injectable()
export class AdvertisementService {
  constructor(
    @Inject('ADVERTISEMENT_MODEL')
    private readonly AdvertisementModel: Model<Advertisement>,
  ) {}

  async getAll(): Promise<Advertisement[]> {
    return this.AdvertisementModel.find().exec();
  }

  async getById(id: number): Promise<Advertisement> {
    return this.AdvertisementModel.findOne((adv: Advertisement) => {
      return adv.id === id;
    }).exec();
  }

  async create(advertisement: Advertisement): Promise<Advertisement> {
    const createdAdv = new this.AdvertisementModel(advertisement);
    return createdAdv.save();
  }

  async update(id: number, advertisement: Advertisement) {
    this.AdvertisementModel.updateOne((adv: Advertisement) => {
      return adv.id === id ? { id, ...advertisement } : adv;
    });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.AdvertisementModel.deleteOne(
      (adv: Advertisement) => {
        return adv.id !== id;
      },
    );
    return result.deletedCount === 1;
  }
}
