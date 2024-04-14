import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { castNumParam } from '../commons/utils/castNumParam';
import { handleErrorResponse } from '../commons/utils/handleErrorResponse';
import { PrefDTO } from './DTO/pref.dto';
import { PrefUpdateDTO } from './DTO/prefUpdate.dto';
import { UpdateUserDTO } from './DTO/userUpdate.dto';
import { MineUserEntity } from './entities/mineUser.etity';
import { PrefEntity } from './entities/prefs.entity';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOkResponse({ type: Array<UserEntity> })
  @ApiBadRequestResponse({ type: BadRequestException })
  @Get()
  async getList(): Promise<UserEntity[]> {
    return await this.userService.getList();
  }

  @ApiOkResponse({ type: MineUserEntity })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getMe(@Request() req): Promise<MineUserEntity> {
    return await this.userService.getMe(req.user.id);
  }

  @ApiOkResponse({ type: UserEntity })
  @ApiBadRequestResponse({ type: BadRequestException })
  @Put('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateMe(
    @Request() req,
    @Body() body: UpdateUserDTO,
  ): Promise<UserEntity> {
    return await this.userService.updateMe(req.user.id, body);
  }

  @ApiOkResponse({ type: UserEntity })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse({ type: BadRequestException })
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<UserEntity> {
    try {
      return await this.userService.getOne(castNumParam('id', id));
    } catch (e) {
      handleErrorResponse(e, 'id', id);
    }
  }

  @ApiOkResponse({ type: PrefEntity })
  @Post('prefs')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createPref(@Request() req, @Body() pref: PrefDTO): Promise<PrefEntity> {
    return await this.userService.createPref(req.user.id, pref);
  }

  @ApiOkResponse({ type: PrefEntity })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse({ type: BadRequestException })
  @Put('prefs/:prefId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updatePref(
    @Param('prefId') prefId: string,
    @Request() req,
    @Body() pref: PrefUpdateDTO,
  ): Promise<PrefEntity> {
    try {
      return await this.userService.updatePref(
        castNumParam('prefId', prefId),
        req.user.id,
        pref,
      );
    } catch (e) {
      handleErrorResponse(e, 'prefId', prefId);
    }
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse({ type: BadRequestException })
  @Delete('prefs/:prefId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deletePref(
    @Param('prefId') prefId: string,
    @Request() req,
  ): Promise<void> {
    try {
      return await this.userService.deletePref(
        castNumParam('prefId', prefId),
        req.user.id,
      );
    } catch (e) {
      handleErrorResponse(e, 'prefId', prefId);
    }
  }
}
