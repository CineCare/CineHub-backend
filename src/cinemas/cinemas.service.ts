import { Injectable } from '@nestjs/common';
import { Cinema } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCinemaDTO } from './DTO/create-cinema.dto';

@Injectable()
export class CinemasService {
    constructor(private prisma: PrismaService) {}
    
    async getList(): Promise<Cinema[]> {
        return await this.prisma.cinema.findMany();
    }

    async getOne(id: number) {
        return await this.prisma.cinema.findUniqueOrThrow({where: {id}});
    }

    async createCinema(cinema: CreateCinemaDTO) {
        return await this.prisma.cinema.create({data: cinema});
    }
}
