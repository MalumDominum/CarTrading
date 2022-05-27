import {
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Body,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { AdvertisementService } from './advertisement.service';
import { Advertisement } from './models/advertisement.model';

@Controller('/advertisements')
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @Get()
  async getAll(): Promise<Advertisement[]> {
    return this.advertisementService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Advertisement> {
    return this.advertisementService.getById(id);
  }

  @Post()
  async create(@Body() advertisement: Advertisement): Promise<Advertisement> {
    return this.advertisementService.create(advertisement);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() advertisement: Advertisement,
  ) {
    this.advertisementService.update(id, advertisement);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    this.advertisementService.delete(id);
  }
}
