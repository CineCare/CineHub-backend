import { BadRequestException, Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductionHousesService } from './production-houses.service';
import { ProductionHouse } from '@prisma/client';
import { CreateProductionHouseDTO } from './DTO/create-productionHouse.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProductionHouseDTO } from './DTO/productionHouse.dto';

@Controller('production-houses')
@ApiTags('Production houses')
export class ProductionHousesController {
    constructor(private readonly productionHousesService: ProductionHousesService) {}

    @ApiOkResponse({type: ProductionHouseDTO, isArray: true})
    @ApiBadRequestResponse({type: BadRequestException })
    @Get()
    @ApiParam({name: 'accessibility', description: 'filter list by accessibility type. Must be a string ( or a comma-separated list of strings ) among "prm", "deaf", "nops"'})
    @ApiParam({name: 'position', description: 'current user gps coordinates. Lattitude and longitude, US decimal format, comma-separated. Eg: "59.3293371;13.4877472"'})
    async getList(@Query('accessibility') accessibility: string, @Query('position') position: string): Promise<ProductionHouse[]> {
        return await this.productionHousesService.getList();
    }

    @Get()
    async getOne(@Param('id') idString: string) {
        //cast id param
        //TODO throw error if not a number
        const id = +idString;
        return await this.productionHousesService.getOne(id);
    }

    @Post()
    async addProductionHouse(@Body() productionHouse: CreateProductionHouseDTO) {
        return await this.productionHousesService.createProductionHouse(productionHouse);
    }
}
