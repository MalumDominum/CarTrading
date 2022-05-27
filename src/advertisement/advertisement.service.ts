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
    return this.AdvertisementModel.find();
  }

  async getById(advertismentId: number): Promise<Advertisement> {
    return this.AdvertisementModel.findOne({ id: advertismentId });
  }

  async create(advertisement: Advertisement): Promise<Advertisement> {
    const createdAdv = new this.AdvertisementModel(advertisement);
    return createdAdv.save();
  }

  async update(advertismentId: number, advertisement: Advertisement) {
    return this.AdvertisementModel.findOneAndReplace(
      { id: advertismentId },
      advertisement,
    );
  }

  async delete(advertismentId: number) {
    return this.AdvertisementModel.deleteOne({ id: advertismentId });
  }
}
