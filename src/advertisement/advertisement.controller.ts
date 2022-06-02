import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Inject,
  LoggerService,
  Req,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdvertisementService } from './advertisement.service';
import { AdvertisementDto } from './dto/advertisement.dto';

@Controller('advertisements')
export class AdvertisementController {
  constructor(
    private readonly advertisementService: AdvertisementService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createAdvertisementDto: AdvertisementDto, @Req() req) {
    const newAd = await this.advertisementService.create(
      createAdvertisementDto,
    );
    this.logger.log(
      `Created advertisement with id - ${newAd._id} by user - ${req.user.email} `,
    );
    return newAd.toObject();
  }

  @Get()
  findAll() {
    return this.advertisementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.advertisementService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateAdvertisementDto: AdvertisementDto,
    @Req() req,
  ) {
    this.logger.log(
      `Update advertisement with id - ${id} by user - ${req.user.email} `,
    );
    return this.advertisementService.update(id, updateAdvertisementDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: ObjectId, @Req() req) {
    this.logger.log(
      `Delete advertisement with id - ${id} by user - ${req.user.email} `,
    );
    return this.advertisementService.remove(id);
  }
}
