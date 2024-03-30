import { Injectable } from '@nestjs/common';
import { Cinema } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCinemaDTO } from './DTO/create-cinema.dto';
import { UpdateCinemaDTO } from './DTO/update-cinema.dto';

@Injectable()
export class CinemasService {
    constructor(private prisma: PrismaService) {}
    
    async getList(): Promise<Cinema[]> {
        return await this.prisma.cinema.findMany();
    }

    async getOne(id: number): Promise<Cinema> {
        return await this.prisma.cinema.findUniqueOrThrow({where: {id}, include: {accessibilities: {select: {accessibility: true}}}});
    }

    async createCinema(cinema: CreateCinemaDTO): Promise<Cinema> {
        return await this.prisma.cinema.create({data: cinema});
    }

    async updateCinema(id: number, cinema: UpdateCinemaDTO): Promise<Cinema> {
        return await this.prisma.cinema.update({where: {id}, data: cinema});
    }

    async deleteCinema(id: number): Promise<void> {
        await this.prisma.cinema.delete({where: {id}});
    }

}
