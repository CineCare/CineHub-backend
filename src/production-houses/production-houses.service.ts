import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductionHouse } from '@prisma/client';
import { CreateProductionHouseDTO } from './DTO/create-productionHouse.dto';
import { PrismaService } from '../prisma/prisma.service';
import { accessibilityFilters } from 'src/commons/constants/filters';
import { castPositionParam, gpsDistance } from 'src/commons/utils/gpsUtils';
import { UpdateProductionHouseDTO } from './DTO/update-productionHouse.dto';

@Injectable()
export class ProductionHousesService {
  constructor(private prisma: PrismaService) {}

  async getList(
    filters: string[],
    coordinates?: { lat: number; lon: number },
  ): Promise<ProductionHouse[]> {
    let findOptions: any = { AND: [] };
    const accessibilitiesFindOptions = [];
    let searchTerm: string | null = null;
    for (const item of filters) {
      if (accessibilityFilters.includes(item)) {
        accessibilitiesFindOptions.push({
          accessibilities: { some: { accessibility: { picto: item } } },
        });
      }
      if (item.startsWith('search:')) {
        searchTerm = item.substring(7);
      }
    }
    if (filters.length > 0) {
      if (accessibilitiesFindOptions.length > 0) {
        findOptions.AND = accessibilitiesFindOptions;
      }
      if (searchTerm) {
        // eslint-disable-next-line prettier/prettier
        findOptions.AND.push({OR: [{name : {contains: searchTerm}}, {address1: {contains: searchTerm}}, {description: {contains: searchTerm}}]})
      }
    }

    let productionHousesCoordinates: {
      id: number;
      gps: string;
      distance?: string;
    }[] = undefined;
    if (coordinates !== null && coordinates !== undefined) {
      //* get gps and calculate distances
      productionHousesCoordinates = await this.prisma.productionHouse.findMany({
        where: findOptions,
        select: { id: true, gps: true },
      });
      for (const item of productionHousesCoordinates) {
        const itemCoordinates = castPositionParam(item.gps);
        item.distance = gpsDistance(
          coordinates.lat,
          coordinates.lon,
          itemCoordinates.lat,
          itemCoordinates.lon,
        );
      }
      findOptions = {
        id: { in: productionHousesCoordinates.map((e) => e.id) },
      };
    }

    return (
      await this.prisma.productionHouse.findMany({
        where: findOptions,
        include: { accessibilities: { select: { accessibility: true } } },
      })
    )
      .map((productionHouse) => {
        return {
          ...productionHouse,
          accessibilities: productionHouse.accessibilities.map(
            (accessibility) => accessibility.accessibility,
          ),
          distance:
            productionHousesCoordinates !== undefined
              ? productionHousesCoordinates.find(
                  (e) => e.id === productionHouse.id,
                ).distance
              : undefined,
        };
      })
      .sort((a, b) => {
        return productionHousesCoordinates !== undefined
          ? +a.distance - +b.distance
          : a.id - b.id;
      });
  }

  async getOne(id: number, coordinates?: { lat: number; lon: number }) {
    const result = await this.prisma.productionHouse.findFirstOrThrow({
      where: { id },
      include: { accessibilities: { select: { accessibility: true } } },
    });
    let distance = undefined;
    if (coordinates !== null && coordinates !== undefined) {
      if (result.gps !== null && result.gps !== undefined) {
        const productionHouseCoordinates = {
          lat: +result.gps.split(',')[0],
          lon: +result.gps.split(',')[1],
        };
        distance = gpsDistance(
          coordinates.lat,
          coordinates.lon,
          productionHouseCoordinates.lat,
          productionHouseCoordinates.lon,
        );
      }
    }
    return {
      ...result,
      accessibilities: result.accessibilities.map((a) => a.accessibility),
      distance,
    };
  }

  async createProductionHouse(productionHouse: CreateProductionHouseDTO) {
    return await this.prisma.productionHouse.create({ data: productionHouse });
  }

  async updateProductionHouse(
    id: number,
    productionHouse: UpdateProductionHouseDTO,
  ): Promise<ProductionHouse> {
    return await this.prisma.productionHouse.update({
      where: { id },
      data: productionHouse,
    });
  }

  async deleteProductionHouse(id: number): Promise<void> {
    await this.prisma.productionHouse.delete({ where: { id } });
  }

  async addAccessibility(
    productionHouseId: number,
    accessibilityId: number,
  ): Promise<string> {
    try {
      await this.prisma.productionHouse.findUniqueOrThrow({
        where: { id: productionHouseId },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException(`productionHouseId ${productionHouseId}`);
      }
      // eslint-disable-next-line
      console.log(e);
      throw e;
    }
    try {
      await this.prisma.accessibility.findUniqueOrThrow({
        where: { id: accessibilityId },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException(`accessibilityId ${accessibilityId}`);
      }
      // eslint-disable-next-line
      console.log(e);
      throw e;
    }
    const existing = await this.prisma.productionHousesAccessibility.findFirst({
      where: { AND: [{ productionHouseId }, { accessibilityId }] },
    });
    if (existing) {
      throw new BadRequestException(
        'This production house already has this accessibility',
      );
    }
    await this.prisma.productionHousesAccessibility.create({
      data: { productionHouseId, accessibilityId },
    });
    //TODO what should be returned ?
    return `${accessibilityId}`;
  }

  async removeAccessibility(
    productionHouseId: number,
    accessibilityId: number,
  ): Promise<void> {
    try {
      await this.prisma.productionHouse.findUniqueOrThrow({
        where: { id: productionHouseId },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException(`productionHouseId ${productionHouseId}`);
      }
      // eslint-disable-next-line
      console.log(e);
      throw e;
    }
    try {
      await this.prisma.productionHousesAccessibility.findFirstOrThrow({
        where: { AND: [{ productionHouseId }, { accessibilityId }] },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException(
          `accessibilityId ${accessibilityId} on cinema ${productionHouseId}`,
        );
      }
      // eslint-disable-next-line
      console.log(e);
      throw e;
    }
    await this.prisma.productionHousesAccessibility.deleteMany({
      where: { AND: [{ productionHouseId }, { accessibilityId }] },
    });
  }
}
