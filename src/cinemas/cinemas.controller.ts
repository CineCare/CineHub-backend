import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Cinema } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { accessibilityFilters } from '../commons/constants/filters';
import { castNumParam } from '../commons/utils/castNumParam';
import { castPositionParam } from '../commons/utils/gpsUtils';
import { handleErrorResponse } from '../commons/utils/handleErrorResponse';
import { CinemaDTO } from './DTO/cinema.dto';
import { CreateCinemaDTO } from './DTO/create-cinema.dto';
import { UpdateCinemaDTO } from './DTO/update-cinema.dto';
import { CinemasService } from './cinemas.service';
import { CinemaEntity } from './entities/cinema.entity';

@Controller('cinemas')
@ApiTags('cinemas')
export class CinemasController {
  constructor(private readonly cinemasService: CinemasService) {}

  @ApiOkResponse({ type: CinemaDTO, isArray: true })
  @ApiBadRequestResponse({ type: BadRequestException })
  @Get()
  @ApiParam({
    name: 'accessibility',
    description:
      'filter list by accessibility type. Must be a string ( or a comma-separated list of strings ) among "prm", "deaf", "nops"',
  })
  @ApiParam({
    name: 'position',
    description:
      'current user gps coordinates. Lattitude and longitude, US decimal format, comma-separated. Eg: "59.3293371;13.4877472"',
  })
  async getList(
    @Query('accessibility') accessibility: string,
    @Query('position') position: string,
  ): Promise<Cinema[]> {
    //* handle filters
    const filters = [];
    if (accessibility !== null && accessibility !== undefined) {
      const accessibilities = accessibility.split(',');
      for (const item of accessibilities) {
        if (!accessibilityFilters.includes(item)) {
          throw new BadRequestException(`Unknown accessibility type ${item}`);
        }
      }
      filters.push(...accessibilities);
    }
    //* handle coordinates
    let coordinates: { lat: number; lon: number } | undefined = undefined;
    if (position !== null && position !== undefined) {
      coordinates = castPositionParam(position);
    }
    return await this.cinemasService.getList(filters, coordinates);
  }

  @ApiOkResponse({ type: CinemaDTO })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse({ type: BadRequestException })
  @Get(':id')
  @ApiParam({ name: 'id', description: 'id of the cinema. Must be a number' })
  @ApiParam({
    name: 'position',
    description:
      'current user gps coordinates. Lattitude and longitude, decimal format, semicolon-separated. Eg: "59.3293371;13.4877472"',
  })
  async getOne(
    @Param('id') id: string,
    @Query('position') position: string,
  ): Promise<CinemaEntity> {
    let coordinates: { lat: number; lon: number } | undefined = undefined;
    if (position !== null && position !== undefined) {
      coordinates = castPositionParam(position);
    }
    try {
      return await this.cinemasService.getOne(
        castNumParam('id', id),
        coordinates,
      );
    } catch (e) {
      handleErrorResponse(e, 'id', id);
    }
  }

  @ApiCreatedResponse()
  @ApiBadRequestResponse({ type: BadRequestException })
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async addCinema(@Body() cinema: CreateCinemaDTO) {
    return await this.cinemasService.createCinema(cinema);
  }

  @ApiOkResponse({ type: CinemaDTO })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse({ type: BadRequestException })
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'id of the cinema. Must be a number' })
  async update(
    @Param('id') id: string,
    @Body() cinema: UpdateCinemaDTO,
  ): Promise<CinemaEntity> {
    try {
      return await this.cinemasService.updateCinema(
        castNumParam('id', id),
        cinema,
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
  @ApiParam({ name: 'id', description: 'id of the cinema. Must be a number' })
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return await this.cinemasService.deleteCinema(castNumParam('id', id));
    } catch (e) {
      handleErrorResponse(e, 'id', id);
    }
  }

  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse({ type: BadRequestException })
  @Post(':cinemaId/accessibility/:accessibilityId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'cinemaId',
    description: 'id of the cinema. Must be a number',
  })
  @ApiParam({
    name: 'accessibilityId',
    description: 'id of the accessibility. Must be a number',
  })
  async addAccessibility(
    @Param('cinemaId') cinemaId: string,
    @Param('accessibilityId') accessibilityId: string,
  ): Promise<string> {
    const paramsError = [];
    if (isNaN(+cinemaId)) {
      paramsError.push('cinemaId');
    }
    if (isNaN(+accessibilityId)) {
      paramsError.push('accessibilityId');
    }
    if (paramsError.length > 0) {
      let errorString = `${paramsError[0]} `;
      if (paramsError.length > 1) {
        errorString += ` and ${paramsError[1]} `;
      }
      errorString += 'must be ';
      errorString += paramsError.length > 1 ? 'numbers' : 'a number';
      throw new BadRequestException(errorString);
    }
    return await this.cinemasService.addAccessibility(
      +cinemaId,
      +accessibilityId,
    );
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse({ type: BadRequestException })
  @Delete(':cinemaId/accessibility/:accessibilityId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'cinemaId',
    description: 'id of the cinema. Must be a number',
  })
  @ApiParam({
    name: 'accessibilityId',
    description: 'id of the accessibility. Must be a number',
  })
  async removeAccessibility(
    @Param('cinemaId') cinemaId: string,
    @Param('accessibilityId') accessibilityId: string,
  ): Promise<void> {
    const paramsError = [];
    if (isNaN(+cinemaId)) {
      paramsError.push('cinemaId');
    }
    if (isNaN(+accessibilityId)) {
      paramsError.push('accessibilityId');
    }
    if (paramsError.length > 0) {
      let errorString = `${paramsError[0]} `;
      if (paramsError.length > 1) {
        errorString += ` and ${paramsError[1]} `;
      }
      errorString += 'must be ';
      errorString += paramsError.length > 1 ? 'numbers' : 'a number';
      throw new BadRequestException(errorString);
    }
    return await this.cinemasService.removeAccessibility(
      +cinemaId,
      +accessibilityId,
    );
  }
}
