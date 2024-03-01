import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CinemasService } from './cinemas.service';
import { Cinema } from '@prisma/client';
import { CreateCinemaDTO } from './DTO/create-cinema.dto';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CinemaDTO } from './DTO/cinema.dto';

@Controller('cinemas')
@ApiTags('cinemas')
export class CinemasController {
    constructor(private readonly cinemasService: CinemasService) {}

    @ApiOkResponse({type: CinemaDTO, isArray: true})
    @ApiBadRequestResponse({type: BadRequestException })
    @Get()
    async getList(): Promise<Cinema[]> {
        return await this.cinemasService.getList();
    }

    @ApiOkResponse({type: CinemaDTO})
    @ApiNotFoundResponse()
    @ApiBadRequestResponse({type: BadRequestException })
    @Get(':id')
    @ApiParam({name: 'id', description: 'id of the cinema. Must be a number'})
    async getOne(@Param('id') idString: string) {
        //cast id param and throw error if not a number
        if(isNaN(+idString)) {
            throw new BadRequestException("param id must be a number");
        }
        try {
            return await this.cinemasService.getOne(+idString);
        } catch(e) {
            if(e.code === 'P2025') {
                throw new NotFoundException();
            }
            console.log(e);
            throw new BadRequestException();
        }
    }

    @Post()
    async addCinema(@Body() cinema: CreateCinemaDTO) {
        return await this.cinemasService.createCinema(cinema);
    }
}
