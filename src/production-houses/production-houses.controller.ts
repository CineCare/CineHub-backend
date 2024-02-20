import { Controller, Get, Param } from '@nestjs/common';
import { ProductionHousesService } from './production-houses.service';
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
}
