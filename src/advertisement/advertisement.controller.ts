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
  getAll(): Advertisement[] {
    return this.advertisementService.getAll();
  }

  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.advertisementService.getById(id);
  }

  @Post()
  create(@Body() advertisement: Advertisement) {
    this.advertisementService.create(advertisement);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() advertisement: Advertisement,
  ) {
    return this.advertisementService.update(id, advertisement);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.advertisementService.delete(id);
  }
}
