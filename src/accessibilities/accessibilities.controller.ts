import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AccessibilitiesService } from './accessibilities.service';
import { AccessibilityEntity } from './entities/accessibility.entity';
import { CreateAccessibilityDTO } from './DTO/create-accessibility.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UpdateAccessibilityDTO } from './DTO/update-accessibility.dto';

@Controller('accessibilities')
@ApiTags('accessibilities')
export class AccessibilitiesController {
    constructor(private readonly accessibilitiesService: AccessibilitiesService) {}

    @ApiOkResponse({type: Array<AccessibilityEntity>})
    @ApiBadRequestResponse({type: BadRequestException })
    @Get()
    async getList(): Promise<AccessibilityEntity[]> {
        return await this.accessibilitiesService.getList();
    }

    @ApiOkResponse({type: Array<AccessibilityEntity>})
    @ApiBadRequestResponse({type: BadRequestException })
    @ApiNotFoundResponse()
    @Get(':id')
    async getOne(@Param('id') id: string): Promise<AccessibilityEntity> {
        //cast id param and throw error if not a number
        if(isNaN(+id)) {
            throw new BadRequestException("param id must be a number");
        }
        try {
            return await this.accessibilitiesService.getOne(+id);
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
    async addAccessibility(@Body() accessibility: CreateAccessibilityDTO): Promise<AccessibilityEntity> {
        return await this.accessibilitiesService.createAccessibility(accessibility);
    }

    @ApiOkResponse()
    @ApiBadRequestResponse({type: BadRequestException })
    @ApiNotFoundResponse()
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async updateAccessibility(@Body() accessibility: UpdateAccessibilityDTO, @Param('id') id: string): Promise<AccessibilityEntity> {
        //cast id param and throw error if not a number
        if(isNaN(+id)) {
            throw new BadRequestException("param id must be a number");
        }
        try {
            return await this.accessibilitiesService.updateAccessibility(+id, accessibility);
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
    async deleteAccessibility(@Param('id') id: string): Promise<void> {
        //cast id param and throw error if not a number
        if(isNaN(+id)) {
            throw new BadRequestException("param id must be a number");
        }
        try {
            return await this.accessibilitiesService.deleteAccessibility(+id);
        } catch(e) {
            if(e.code === 'P2025') {
                throw new NotFoundException(`id ${id}`);
            }
            console.log(e);
            throw new BadRequestException();
        }
        
    }
}