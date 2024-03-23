import { Controller, Request, Get, UseGuards, Post, Body, Put, Param, BadRequestException, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { MineUserEntity } from './entities/mineUser.etity';
import { UserEntity } from './entities/user.entity';
import { PrefEntity } from './entities/prefs.entity';
import { PrefDTO } from './DTO/pref.dto';
import { PrefUpdateDTO } from './DTO/prefUpdate.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    async getList(): Promise<UserEntity[]> {
        return await this.userService.getList();
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: MineUserEntity })
    async getMe(@Request() req): Promise<MineUserEntity> {
        return await this.userService.getMe(req.user.id);
    }

    @Post('prefs')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: PrefEntity })
    async createPref(@Request() req, @Body() pref: PrefDTO): Promise<PrefEntity> {
        return await this.userService.createPref(req.user.id, pref);
    }

    @ApiOkResponse({type: PrefEntity})
    @ApiNotFoundResponse()
    @ApiBadRequestResponse({type: BadRequestException })
    @Put('prefs/:prefId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: PrefEntity })
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
            console.log(e);
            throw new BadRequestException();
        }
    }
    
}
