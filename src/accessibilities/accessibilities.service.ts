import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccessibilityEntity } from './entities/accessibility.entity';
import { CreateAccessibilityDTO } from './DTO/create-accessibility.dto';
import { UpdateAccessibilityDTO } from './DTO/update-accessibility.dto';

@Injectable()
export class AccessibilitiesService {
  constructor(private prisma: PrismaService) {}

  async getList(): Promise<AccessibilityEntity[]> {
    return await this.prisma.accessibility.findMany();
  }

  async getOne(id: number): Promise<AccessibilityEntity> {
    return await this.prisma.accessibility.findUniqueOrThrow({ where: { id } });
  }

  async createAccessibility(
    accessibility: CreateAccessibilityDTO,
  ): Promise<AccessibilityEntity> {
    return await this.prisma.accessibility.create({ data: accessibility });
  }

  async updateAccessibility(
    id: number,
    accessibility: UpdateAccessibilityDTO,
  ): Promise<AccessibilityEntity> {
    return await this.prisma.accessibility.update({
      where: { id },
      data: accessibility,
    });
  }

  async deleteAccessibility(id: number): Promise<void> {
    await this.prisma.accessibility.delete({ where: { id } });
  }
}
