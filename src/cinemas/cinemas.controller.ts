import { BadRequestException, Body, Controller,UseGuards, Get, NotFoundException, Param, Post, Put, Delete, Query } from '@nestjs/common';
import { CinemasService } from './cinemas.service';
import { Cinema } from '@prisma/client';
import { CreateCinemaDTO } from './DTO/create-cinema.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CinemaDTO } from './DTO/cinema.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UpdateCinemaDTO } from './DTO/update-cinema.dto';
import { CinemaEntity } from './entities/cinema.entity';
import { accessibilityFilters } from '../commons/constants/filters';
import { castNumParam } from '../commons/utils/castNumParam';
import { handleErrorResponse } from '../commons/utils/handleErrorResponse';

@Controller('cinemas')
@ApiTags('cinemas')
export class CinemasController {
    constructor(private readonly cinemasService: CinemasService) {}

    @ApiOkResponse({type: CinemaDTO, isArray: true})
    @ApiBadRequestResponse({type: BadRequestException })
    @Get()
    @ApiParam({name: 'accessibility', description: 'filter list by accessibility type. Must be a string ( or a semicolon-separated list of strings ) among "prm", "deaf", "nops"'})
    async getList(@Query('accessibility') accessibility: string): Promise<Cinema[]> {
        let filters = [];
        if(accessibility) {
            const accessibilities = accessibility.split(';');
            for(let item of accessibilities) {
                if(!accessibilityFilters.includes(item)) {
                    throw new BadRequestException(`Unknown accessibility type ${item}`);
                }
            }
            filters.push(...accessibilities)
        }
        return await this.cinemasService.getList(filters);
    }

    @ApiOkResponse({type: CinemaDTO})
    @ApiNotFoundResponse()
    @ApiBadRequestResponse({type: BadRequestException })
    @Get(':id')
    @ApiParam({name: 'id', description: 'id of the cinema. Must be a number'})
    async getOne(@Param('id') id: string): Promise<CinemaEntity> {
        try {
            return await this.cinemasService.getOne(castNumParam('id', id));
        } catch(e) {
            handleErrorResponse(e, 'id', id);
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
        try {
            return await this.cinemasService.updateCinema(castNumParam('id', id), cinema);
        } catch(e) {
            handleErrorResponse(e, 'id', id);
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
        try {
            return await this.cinemasService.deleteCinema(castNumParam('id', id));
        } catch(e) {
            handleErrorResponse(e, 'id', id);
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
