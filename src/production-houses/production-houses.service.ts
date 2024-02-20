import { Injectable } from '@nestjs/common';
import { ProductionHouse } from '@prisma/client';
import { CreateProductionHouseDTO } from './DTO/create-ProductionHouse.dto'
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductionHousesService {
    constructor(private prisma: PrismaService) {}

    async getList(): Promise<ProductionHouse[]> {
        return await this.prisma.productionHouse.findMany();
    }

    async getOne(id: number) {
        return await this.prisma.productionHouse.findFirstOrThrow({ where: {id}});
    }

    async createProductionHouse(productionHouse: CreateProductionHouseDTO) {
        return await this.prisma.productionHouse.create({data: productionHouse})
    }
}
