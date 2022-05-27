import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { AdvertisementModule } from './advertisement/advertisement.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env', '.env.development'] }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AdvertisementModule,
    UserModule,
    VehicleModule,
  ],
})
export class AppModule {}
