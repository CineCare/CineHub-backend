import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { MineUserEntity } from './entities/mineUser.etity';
import { UserEntity } from './entities/user.entity';

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
}
