import { Injectable, NotFoundException } from '@nestjs/common';
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

    async addAccessibility(cinemaId: number, accessibilityId: number): Promise<string> {
        try {
            await this.prisma.cinema.findUniqueOrThrow({where: {id: cinemaId}});
        } catch(e) {
            if(e.code === 'P2025') {
                throw new NotFoundException(`cinemaId ${cinemaId}`);
            }
            console.log(e);
            throw e;
        }
        try {
            await this.prisma.accessibility.findUniqueOrThrow({where: {id: accessibilityId}});
        } catch(e) {
            if(e.code === 'P2025') {
                throw new NotFoundException(`accessibilityId ${accessibilityId}`);
            }
            console.log(e);
            throw e;
        }
        await this.prisma.cinemaAccessibility.create({data: {cinemaId, accessibilityId}});
        //TODO what should be returned ?
        return `${accessibilityId}`;
    }

    async removeAccessibility(cinemaId: number, accessibilityId: number): Promise<void> {
        try {
            await this.prisma.cinema.findUniqueOrThrow({where: {id: cinemaId}});
        } catch(e) {
            if(e.code === 'P2025') {
                throw new NotFoundException(`cinemaId ${cinemaId}`);
            }
            console.log(e);
            throw e;
        }
        try {
            await this.prisma.cinemaAccessibility.findFirstOrThrow({where: {AND: [{cinemaId}, {accessibilityId}]}});
        } catch(e) {
            if(e.code === 'P2025') {
                throw new NotFoundException(`accessibilityId ${accessibilityId} on cinema ${cinemaId}`);
            }
            console.log(e);
            throw e;
        }
        await this.prisma.cinemaAccessibility.deleteMany({where: {AND: [{cinemaId}, {accessibilityId}]}});
    }
}
