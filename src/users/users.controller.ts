import { Controller, Request, Get, UseGuards, Post, Body, Put, Param, BadRequestException, NotFoundException, Delete, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth, ApiNotFoundResponse, ApiBadRequestResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { MineUserEntity } from './entities/mineUser.etity';
import { UserEntity } from './entities/user.entity';
import { PrefEntity } from './entities/prefs.entity';
import { PrefDTO } from './DTO/pref.dto';
import { PrefUpdateDTO } from './DTO/prefUpdate.dto';
import { UpdateUserDTO } from './DTO/userUpdate.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    async getList(): Promise<UserEntity[]> {
        return await this.userService.getList();
    }

    @ApiOkResponse({ type: MineUserEntity })
    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async getMe(@Request() req): Promise<MineUserEntity> {
        return await this.userService.getMe(req.user.id);
    }

    @ApiOkResponse({type: UserEntity})
    @ApiBadRequestResponse({type: BadRequestException })
    @Put('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async updateMe(@Request() req, @Body() body: UpdateUserDTO): Promise<UserEntity> {
        return await this.userService.updateMe(req.user.id, body);
    }

    @ApiOkResponse({type: UserEntity})
    @ApiNotFoundResponse()
    @ApiBadRequestResponse({type: BadRequestException })
    @Get(':id')
    async getOne(@Param('id') id: string): Promise<UserEntity> {
        if(isNaN(+id)) {
            throw new BadRequestException("param id must be a number");
        }
        try {
            return await this.userService.getOne(+id);
        } catch(e) {
            if(e.code === 'P2025') {
                throw new NotFoundException();
            }
            console.log(e);
            throw new BadRequestException();
        }
    } 

    @ApiOkResponse({ type: PrefEntity })
    @Post('prefs')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async createPref(@Request() req, @Body() pref: PrefDTO): Promise<PrefEntity> {
        return await this.userService.createPref(req.user.id, pref);
    }

    @ApiOkResponse({type: PrefEntity})
    @ApiNotFoundResponse()
    @ApiBadRequestResponse({type: BadRequestException })
    @Put('prefs/:prefId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async updatePref(@Param('prefId') prefId: string, @Request() req, @Body() pref: PrefUpdateDTO): Promise<PrefEntity> {
        if(isNaN(+prefId)) {
            throw new BadRequestException("param id must be a number");
        }
        try {
            return await this.userService.updatePref(+prefId, req.user.id, pref);
        } catch(e) {
            if(e.code === 'P2025') {
                throw new NotFoundException();
            }
            if(e instanceof UnauthorizedException) {
                throw e;
            }
            console.log(e);
            throw new BadRequestException();
        }
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @ApiBadRequestResponse({type: BadRequestException })
    @Delete('prefs/:prefId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async deletePref(@Param('prefId') prefId: string, @Request() req): Promise<void> {
        if(isNaN(+prefId)) {
            throw new BadRequestException("param id must be a number");
        }
        try {
            return await this.userService.deletePref(+prefId, req.user.id);
        } catch(e) {
            if(e.code === 'P2025') {
                throw new NotFoundException("prefId");
            }
            console.log(e);
            throw new BadRequestException();
        }
    }
}
