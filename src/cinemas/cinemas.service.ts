import { Injectable } from '@nestjs/common';
import { Cinema } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCinemaDTO } from './DTO/create-cinema.dto';

@Injectable()
export class CinemasService {
    constructor(private prisma: PrismaService) {}
    
    async getCinemas(): Promise<Cinema[]> {
        return await this.prisma.cinema.findMany();
    }

    async createCinema(cinema) {
        return await this.prisma.cinema.create({data: cinema});
    }
}
