import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccessibilitiesService {
    constructor(private prisma: PrismaService) {}

    async getList() {
        return await this.prisma.accessibility.findMany();
    }
}
