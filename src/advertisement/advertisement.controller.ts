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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { UserRole } from 'src/user/dto/user-role.enum';
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
    try {
      this.logger.log(`Create advertisement by user - ${req.user.email} `);
      const newAd = await this.advertisementService.create(
        createAdvertisementDto,
        req.user.id,
      );
      this.logger.log(
        `Created advertisement with id - ${newAd._id} by user - ${req.user.email} `,
      );
      return newAd.toObject();
    } catch (e) {
      this.logger.error(
        `Error while creating advertisement by user - ${req.user.email} - ${e.message}`,
      );
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.advertisementService.findAll();
    } catch (e) {
      this.logger.error(
        `Error while getting all advertisements - ${e.message}`,
      );
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: ObjectId) {
    try {
      return await this.advertisementService.findOne(id);
    } catch (e) {
      this.logger.error(
        `Error while getting advertisement with id - ${id} - ${e.message}`,
      );
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: ObjectId,
    @Body() updateAdvertisementDto: AdvertisementDto,
    @Req() req,
  ) {
    try {
      this.logger.log(
        `Update advertisement with id - ${id} by user - ${req.user.email} `,
      );
      return await this.advertisementService.update(
        id,
        updateAdvertisementDto,
        req.user.id,
      );
    } catch (e) {
      this.logger.error(
        `Error while updating advertisement with id - ${id} by user - ${req.user.email} - ${e.message}`,
      );
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: ObjectId, @Req() req) {
    this.logger.log(
      `Delete advertisement with id - ${id} by user - ${req.user.email} `,
    );
    return this.advertisementService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-ads/get-all')
  async findUserAds(@Param('id') id: ObjectId, @Req() req) {
    this.logger.log(`Get user ads by user - ${req.user.email} `);
    try {
      return await this.advertisementService.findUserAds(req.user.id);
    } catch (e) {
      this.logger.error(
        `Error while getting user ads by user - ${req.user.email} - ${e.message}`,
      );
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('my-ads/remove/:id')
  async removeOwnAd(@Param('id') id: ObjectId, @Req() req) {
    this.logger.log(
      `Delete advertisement with id - ${id} by user - ${req.user.email} `,
    );
    try {
      return await this.advertisementService.removeUsersAd(id, req.user.id);
    } catch (e) {
      this.logger.error(
        `Error while deleting advertisement with id - ${id} by user - ${req.user.email} - ${e.message}`,
      );
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  async likeAd(@Param('id') id: ObjectId, @Req() req) {
    this.logger.log(
      `Like advertisement with id - ${id} by user - ${req.user.email} `,
    );
    try {
      return await this.advertisementService.likeAd(req.user.id, id);
    } catch (e) {
      this.logger.error(
        `Error while liking advertisement with id - ${id} by user - ${req.user.email} - ${e.message}`,
      );
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('liked-ads/get-all')
  async findUserLikedAds(@Req() req) {
    this.logger.log(`Get liked ads by user - ${req.user.email} `);
    try {
      return await this.advertisementService.findUserLikedAds(req.user.id);
    } catch (e) {
      this.logger.error(
        `Error while getting liked ads by user - ${req.user.email} - ${e.message}`,
      );
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('liked-ads/remove/:id')
  async removeLikedAd(@Param('id') id: ObjectId, @Req() req) {
    this.logger.log(
      `Delete advertisement from liked ads with id - ${id} by user - ${req.user.email} `,
    );
    try {
      return await this.advertisementService.removeLikedAd(id, req.user.id);
    } catch (e) {
      this.logger.error(
        `Error while deleting advertisement from liked ads with id - ${id} by user - ${req.user.email} - ${e.message}`,
      );
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
