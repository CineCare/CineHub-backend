import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CinemasService } from './cinemas.service';
import { Cinema } from '@prisma/client';
import { CreateCinemaDTO } from './DTO/create-cinema.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('cinemas')
@ApiTags('cinemas')
export class CinemasController {
    constructor(private readonly cinemasService: CinemasService) {}

    @Get()
    async getList(): Promise<Cinema[]> {
        return await this.cinemasService.getList();
    }

    @Get(':id')
    async getOne(@Param('id') idString: string) {
        //cast id param
        //TODO throw error if not a number
        const id = +idString;
        return await this.cinemasService.getOne(id);
    }

    @Post()
    async addCinema(@Body() cinema: CreateCinemaDTO) {
        return await this.cinemasService.createCinema(cinema);
    }
}
