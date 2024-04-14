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
import { ProductionHousesService } from './production-houses.service';
import { ProductionHouse } from '@prisma/client';
import { CreateProductionHouseDTO } from './DTO/create-productionHouse.dto';
import {
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ProductionHouseDTO } from './DTO/productionHouse.dto';
import { accessibilityFilters } from '../commons/constants/filters';
import { castPositionParam } from '../commons/utils/gpsUtils';
import { castNumParam } from '../commons/utils/castNumParam';
import { handleErrorResponse } from '../commons/utils/handleErrorResponse';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UpdateProductionHouseDTO } from './DTO/update-productionHouse.dto';

@Controller('production-houses')
@ApiTags('Production houses')
export class ProductionHousesController {
  constructor(
    private readonly productionHousesService: ProductionHousesService,
  ) {}

  @ApiOkResponse({ type: ProductionHouseDTO, isArray: true })
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
  @ApiParam({
    name: 'search',
    description:
      'Search term. Will filter production houses including this term in their name, adress or description',
  })
  async getList(
    @Query('accessibility') accessibility: string,
    @Query('position') position: string,
    @Query('search') search: string,
  ): Promise<ProductionHouse[]> {
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
    if (search !== null && search !== undefined) {
      filters.push(`search:${search}`);
    }
    //* handle coordinates
    let coordinates: { lat: number; lon: number } | undefined = undefined;
    if (position !== null && position !== undefined) {
      coordinates = castPositionParam(position);
    }
    return await this.productionHousesService.getList(filters, coordinates);
  }

  @ApiOkResponse({ type: ProductionHouseDTO })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse({ type: BadRequestException })
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id of the production house. Must be a number',
  })
  @ApiParam({
    name: 'position',
    description:
      'current user gps coordinates. Lattitude and longitude, decimal format, semicolon-separated. Eg: "59.3293371;13.4877472"',
  })
  async getOne(@Param('id') id: string, @Query('position') position: string) {
    let coordinates: { lat: number; lon: number } | undefined = undefined;
    if (position !== null && position !== undefined) {
      coordinates = castPositionParam(position);
    }
    try {
      return await this.productionHousesService.getOne(
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
  async addProductionHouse(@Body() productionHouse: CreateProductionHouseDTO) {
    return await this.productionHousesService.createProductionHouse(
      productionHouse,
    );
  }

  @ApiOkResponse({ type: ProductionHouseDTO })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse({ type: BadRequestException })
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'id of the production house. Must be a number',
  })
  async update(
    @Param('id') id: string,
    @Body() productionHouse: UpdateProductionHouseDTO,
  ): Promise<ProductionHouse> {
    try {
      return await this.productionHousesService.updateProductionHouse(
        castNumParam('id', id),
        productionHouse,
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
  @ApiParam({
    name: 'id',
    description: 'id of the production house. Must be a number',
  })
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return await this.productionHousesService.deleteProductionHouse(
        castNumParam('id', id),
      );
    } catch (e) {
      handleErrorResponse(e, 'id', id);
    }
  }

  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse({ type: BadRequestException })
  @Post(':productionHouseId/accessibility/:accessibilityId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'productionHouseId',
    description: 'id of the production house. Must be a number',
  })
  @ApiParam({
    name: 'accessibilityId',
    description: 'id of the accessibility. Must be a number',
  })
  async addAccessibility(
    @Param('productionHouseId') productionHouseId: string,
    @Param('accessibilityId') accessibilityId: string,
  ): Promise<string> {
    const paramsError = [];
    if (isNaN(+productionHouseId)) {
      paramsError.push('productionHouseId');
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
    return await this.productionHousesService.addAccessibility(
      +productionHouseId,
      +accessibilityId,
    );
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse({ type: BadRequestException })
  @Delete(':productionHouseId/accessibility/:accessibilityId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'productionHouseId',
    description: 'id of the production house. Must be a number',
  })
  @ApiParam({
    name: 'accessibilityId',
    description: 'id of the accessibility. Must be a number',
  })
  async removeAccessibility(
    @Param('productionHouseId') productionHouseId: string,
    @Param('accessibilityId') accessibilityId: string,
  ): Promise<void> {
    const paramsError = [];
    if (isNaN(+productionHouseId)) {
      paramsError.push('productionHouseId');
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
    return await this.productionHousesService.removeAccessibility(
      +productionHouseId,
      +accessibilityId,
    );
  }
}
