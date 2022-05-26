import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AdvertisementService } from './advertisement.service';
import { AdvertisementController } from './advertisement.controller';

@Module({
  imports: [HttpModule],
  providers: [AdvertisementService],
  controllers: [AdvertisementController],
})
export class AdvertisementModule {}
