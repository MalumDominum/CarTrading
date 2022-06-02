import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
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
  ) {}

  async findAll(): Promise<Advertisement[]> {
    const ads = await this.advertisementModel.find();
    return ads;
  }

  async findOne(id: ObjectId): Promise<Advertisement> {
    const ad = await this.advertisementModel.findById(id);
    return ad;
  }

  async create(
    createAdvertisementDto: AdvertisementDto,
  ): Promise<AdvertisementDocument> {
    const ad = await this.advertisementModel.create(createAdvertisementDto);
    return ad;
  }

  async update(
    id: ObjectId,
    updateAdvertisementDto: AdvertisementDto,
  ): Promise<Advertisement> {
    const ad = await this.advertisementModel.findByIdAndUpdate(
      id,
      {
        ...updateAdvertisementDto,
      },
      { new: true },
    );
    await ad.save();
    return ad;
  }

  async remove(id: ObjectId): Promise<mongoose.Types.ObjectId> {
    const ad = await this.advertisementModel.findByIdAndDelete(id);
    // eslint-disable-next-line no-underscore-dangle
    return ad._id;
  }
}
