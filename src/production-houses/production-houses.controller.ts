import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductionHousesService } from './production-houses.service';
import { ProductionHouse } from '@prisma/client';
import { CreateProductionHouseDTO } from './DTO/create-ProductionHouse.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('production-houses')
@ApiTags('Production houses')
export class ProductionHousesController {
    constructor(private readonly productionHousesService: ProductionHousesService) {}

    @Get()
    async getList(): Promise<ProductionHouse[]> {
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
