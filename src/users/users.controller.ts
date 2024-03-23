import { Controller, Request, Get, UseGuards, Post, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
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

    @Put('prefs/:prefId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: PrefEntity })
    async updatePref(@Request() req, @Body() pref: PrefUpdateDTO): Promise<PrefEntity> {
        return await this.userService.updatePref(req.user.id, pref);
    }
    
}
