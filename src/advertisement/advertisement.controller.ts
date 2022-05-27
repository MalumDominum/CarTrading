import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { AdvertisementService } from './advertisement.service';
import { AdvertisementDto } from './dto/advertisement.dto';

@Controller('advertisements')
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @Post()
  create(@Body() createAdvertisementDto: AdvertisementDto) {
    return this.advertisementService.create(createAdvertisementDto);
  }

  @Get()
  findAll() {
    return this.advertisementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.advertisementService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateAdvertisementDto: AdvertisementDto,
  ) {
    return this.advertisementService.update(id, updateAdvertisementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.advertisementService.remove(id);
  }
}
