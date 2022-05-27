import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from 'src/database/database.module';
import { AdvertisementService } from './advertisement.service';
import { AdvertisementController } from './advertisement.controller';
import { advertisementProviders } from './advertisement.providers';

@Module({
  imports: [HttpModule, DatabaseModule],
  providers: [AdvertisementService, ...advertisementProviders],
  controllers: [AdvertisementController],
})
export class AdvertisementModule {}
