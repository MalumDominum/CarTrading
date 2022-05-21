import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CarModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
