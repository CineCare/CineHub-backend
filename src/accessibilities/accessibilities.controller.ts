import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { castNumParam } from '../commons/utils/castNumParam';
import { handleErrorResponse } from '../commons/utils/handleErrorResponse';
import { CreateAccessibilityDTO } from './DTO/create-accessibility.dto';
import { UpdateAccessibilityDTO } from './DTO/update-accessibility.dto';
import { AccessibilitiesService } from './accessibilities.service';
import { AccessibilityEntity } from './entities/accessibility.entity';

@Controller('accessibilities')
@ApiTags('accessibilities')
export class AccessibilitiesController {
  constructor(
    private readonly accessibilitiesService: AccessibilitiesService,
  ) {}

  @ApiOkResponse({ type: Array<AccessibilityEntity> })
  @ApiBadRequestResponse({ type: BadRequestException })
  @Get()
  async getList(): Promise<AccessibilityEntity[]> {
    return await this.accessibilitiesService.getList();
  }

  @ApiOkResponse({ type: Array<AccessibilityEntity> })
  @ApiBadRequestResponse({ type: BadRequestException })
  @ApiNotFoundResponse()
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<AccessibilityEntity> {
    //cast id param and throw error if not a number
    try {
      return await this.accessibilitiesService.getOne(castNumParam('id', id));
    } catch (e) {
      handleErrorResponse(e, 'id', id);
    }
  }

  @ApiCreatedResponse()
  @ApiBadRequestResponse({ type: BadRequestException })
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async addAccessibility(
    @Body() accessibility: CreateAccessibilityDTO,
  ): Promise<AccessibilityEntity> {
    return await this.accessibilitiesService.createAccessibility(accessibility);
  }

  @ApiOkResponse()
  @ApiBadRequestResponse({ type: BadRequestException })
  @ApiNotFoundResponse()
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateAccessibility(
    @Body() accessibility: UpdateAccessibilityDTO,
    @Param('id') id: string,
  ): Promise<AccessibilityEntity> {
    try {
      return await this.accessibilitiesService.updateAccessibility(
        castNumParam('id', id),
        accessibility,
      );
    } catch (e) {
      handleErrorResponse(e, 'id', id);
    }
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse({ type: BadRequestException })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deleteAccessibility(@Param('id') id: string): Promise<void> {
    try {
      return await this.accessibilitiesService.deleteAccessibility(
        castNumParam('id', id),
      );
    } catch (e) {
      handleErrorResponse(e, 'id', id);
    }
  }
}
