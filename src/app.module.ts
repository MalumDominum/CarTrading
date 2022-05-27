import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AdvertisementModule } from './advertisement/advertisement.module';
import { UserModule } from './user/user.module';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [
    DatabaseModule,
    AdvertisementModule,
    UserModule,
    VehicleModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.development.env'],
    }),
  ],
})
export class AppModule {}
