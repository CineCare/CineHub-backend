import { BadRequestException, Body, Controller,UseGuards, Get, NotFoundException, Param, Post, Put, Delete } from '@nestjs/common';
import { CinemasService } from './cinemas.service';
import { Cinema } from '@prisma/client';
import { CreateCinemaDTO } from './DTO/create-cinema.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CinemaDTO } from './DTO/cinema.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UpdateCinemaDTO } from './DTO/update-cinema.dto';
import { CinemaEntity } from './entities/cinema.entity';

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
    async getOne(@Param('id') id: string) {
        //cast id param and throw error if not a number
        if(isNaN(+id)) {
            throw new BadRequestException("param id must be a number");
        }
        try {
            return await this.cinemasService.getOne(+id);
        } catch(e) {
            if(e.code === 'P2025') {
                throw new NotFoundException(`id ${id}`);
            }
            console.log(e);
            throw new BadRequestException();
        }
    }

    @ApiCreatedResponse()
    @ApiBadRequestResponse({type: BadRequestException })
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async addCinema(@Body() cinema: CreateCinemaDTO) {
        return await this.cinemasService.createCinema(cinema);
    }

    @ApiOkResponse({type: CinemaDTO})
    @ApiNotFoundResponse()
    @ApiBadRequestResponse({type: BadRequestException })
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiParam({name: 'id', description: 'id of the cinema. Must be a number'})
    async update(@Param('id') id: string, @Body() cinema: UpdateCinemaDTO): Promise<CinemaEntity> {
        //cast id param and throw error if not a number
        if(isNaN(+id)) {
            throw new BadRequestException("param id must be a number");
        }
        try {
            return await this.cinemasService.updateCinema(+id, cinema);
        } catch(e) {
            if(e.code === 'P2025') {
                throw new NotFoundException(`id ${id}`);
            }
            console.log(e);
            throw new BadRequestException();
        }
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @ApiBadRequestResponse({type: BadRequestException })
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiParam({name: 'id', description: 'id of the cinema. Must be a number'})
    async delete(@Param('id') id: string): Promise<void> {
        if(isNaN(+id)) {
            throw new BadRequestException("param id must be a number");
        }
        try {
            return await this.cinemasService.deleteCinema(+id);
        } catch(e) {
            if(e.code === 'P2025') {
                throw new NotFoundException(`id ${id}`);
            }
            console.log(e);
            throw new BadRequestException();
        }
    }

    @ApiCreatedResponse()
    @ApiNotFoundResponse()
    @ApiBadRequestResponse({type: BadRequestException })
    @Post(':cinemaId/accessibility/:accessibilityId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiParam({name: 'cinemaId', description: 'id of the cinema. Must be a number'})
    @ApiParam({name: 'accessibilityId', description: 'id of the accessibility. Must be a number'})
    async addAccessibility(@Param('cinemaId') cinemaId: string, @Param('accessibilityId') accessibilityId: string): Promise<string> {
        let paramsError = [];
        if(isNaN(+cinemaId)) {
            paramsError.push('cinemaId');
        }
        if(isNaN(+accessibilityId)) {
            paramsError.push('accessibilityId');
        }
        if(paramsError.length > 0) {
            let errorString = `${paramsError[0] } `;
            if(paramsError.length > 1) {
                errorString += ` and ${paramsError[1]} `
            }
            errorString += 'must be ';
            errorString += paramsError.length > 1 ? 'numbers' : 'a number';
            throw new BadRequestException(errorString);
        }
        return await this.cinemasService.addAccessibility(+cinemaId, +accessibilityId);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @ApiBadRequestResponse({type: BadRequestException })
    @Delete(':cinemaId/accessibility/:accessibilityId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiParam({name: 'cinemaId', description: 'id of the cinema. Must be a number'})
    @ApiParam({name: 'accessibilityId', description: 'id of the accessibility. Must be a number'})
    async removeAccessibility(@Param('cinemaId') cinemaId: string, @Param('accessibilityId') accessibilityId: string): Promise<void> {
        let paramsError = [];
        if(isNaN(+cinemaId)) {
            paramsError.push('cinemaId');
        }
        if(isNaN(+accessibilityId)) {
            paramsError.push('accessibilityId');
        }
        if(paramsError.length > 0) {
            let errorString = `${paramsError[0] } `;
            if(paramsError.length > 1) {
                errorString += ` and ${paramsError[1]} `
            }
            errorString += 'must be ';
            errorString += paramsError.length > 1 ? 'numbers' : 'a number';
            throw new BadRequestException(errorString);
        }
        return await this.cinemasService.removeAccessibility(+cinemaId, +accessibilityId);
    }
}
