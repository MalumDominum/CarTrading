import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { AdvertisementService } from './advertisement.service';
import { AdvertisementController } from './advertisement.controller';
import {
  Advertisement,
  AdvertisementSchema,
} from './schemas/advertisement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Advertisement.name, schema: AdvertisementSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [AdvertisementController],
  providers: [AdvertisementService, UserService],
})
export class AdvertisementModule {}
