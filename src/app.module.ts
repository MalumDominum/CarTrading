import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { transports, format } from 'winston';
import { WinstonModule } from 'nest-winston';
import { UserModule } from './user/user.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { AdvertisementModule } from './advertisement/advertisement.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env', '.env.development'] }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AdvertisementModule,
    UserModule,
    VehicleModule,
    AuthModule,
    WinstonModule.forRoot({
      level: 'info',
      format: format.combine(
        format.timestamp({
          format: 'YYYY/MM/DD HH:mm:ss',
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.simple(),
      ),
      defaultMeta: { service: 'car-trading-service' },
      transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
      ],
    }),
    ConfigModule,
  ],
})
export class AppModule {}
