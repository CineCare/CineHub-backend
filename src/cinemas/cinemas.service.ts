import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Cinema } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCinemaDTO } from './DTO/create-cinema.dto';
import { UpdateCinemaDTO } from './DTO/update-cinema.dto';
import { CinemaEntity } from './entities/cinema.entity';
import { accessibilityFilters } from '../commons/constants/filters';
import { castPositionParam, gpsDistance } from '../commons/utils/gpsUtils';
import { CinemaDTO } from './DTO/cinema.dto';
//import * as util from 'util';

@Injectable()
export class CinemasService {
    constructor(private prisma: PrismaService) {}
    
    async getList(filters: string[], coordinates?: {lat:number, lon: number}): Promise<CinemaEntity[]> {
        let findOptions:any = {AND: []};
        let accessibilitiesFindOptions = [];
        for(let item of filters) {
            if(accessibilityFilters.includes(item)) {
                accessibilitiesFindOptions.push({accessibilities: {some: {accessibility: {picto: item}}}});
            }
        }
        if(filters.length > 0) {
            if(accessibilitiesFindOptions.length > 0) {
                findOptions.AND = accessibilitiesFindOptions;
            }
        }

        let cinemasCoordinates:{id: number, gps: string, distance?: string}[] = undefined;
        if(coordinates !== null && coordinates !== undefined) {
            //* get gps and calculate distances
            cinemasCoordinates = await this.prisma.cinema.findMany({where: findOptions, select: {id: true, gps: true}});
            for(let item of cinemasCoordinates) {
                let itemCoordinates = castPositionParam(item.gps);
                item.distance = gpsDistance(coordinates.lat, coordinates.lon, itemCoordinates.lat, itemCoordinates.lon);
            }
            findOptions = {id: {in: cinemasCoordinates.map(e => e.id)}};
        }

        return (await this.prisma.cinema.findMany({where: findOptions, include: {accessibilities: {select: {accessibility: true}}}}))
            .map(cinema => { return { 
                ...cinema,
                accessibilities: cinema.accessibilities.map(accessibility => accessibility.accessibility),
                distance: cinemasCoordinates !== undefined ? cinemasCoordinates.find(e => e.id === cinema.id).distance : undefined
            }})
            .sort(
                (a, b) => {
                    return cinemasCoordinates !== undefined ? 
                    +a.distance - +b.distance :
                    a.id - b.id
                }
            );
    }

    async getOne(id: number, coordinates?: {lat: number, lon: number}): Promise<CinemaEntity> {
        const result = await this.prisma.cinema.findUniqueOrThrow({where: {id}, include: {accessibilities: {select: {accessibility: true}}}});
        let distance = undefined;
        if(coordinates !== null && coordinates !== undefined) {
            //console.log("coordinates : ", coordinates);
            if(result.gps !== null && result.gps !== undefined) {
                let cinemaCoordinates = {lat: +result.gps.split(';')[0], lon: +result.gps.split(';')[1]};
                //console.log(cinemaCoordinates);
                distance = gpsDistance(coordinates.lat, coordinates.lon, cinemaCoordinates.lat, cinemaCoordinates.lon);
                //console.log("distance : ", distance);
            }
        }
        return {...result, accessibilities: result.accessibilities.map(a => a.accessibility), distance};
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
        const existing = await this.prisma.cinemaAccessibility.findFirst({where: {AND: [{cinemaId}, {accessibilityId}]}});
        if(existing) {
            throw new BadRequestException("This cinema already has this accessibility");
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
