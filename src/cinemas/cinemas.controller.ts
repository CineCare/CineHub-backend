import { Body, Controller, Get, Post } from '@nestjs/common';
import { CinemasService } from './cinemas.service';
import { Cinema } from '@prisma/client';
import { CreateCinemaDTO } from './DTO/create-cinema.dto';

@Controller('cinemas')
export class CinemasController {
    constructor(private readonly cinemasService: CinemasService) {}

    @Get()
    async getCinemas(): Promise<Cinema[]> {
        return this.cinemasService.getCinemas();
    }

    @Post()
    async addCinema(@Body() cinema: CreateCinemaDTO) {
        return this.cinemasService.createCinema(cinema);
    }
}
