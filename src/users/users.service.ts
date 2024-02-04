import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { MineUserEntity } from './entities/mineUser.etity';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getList(): Promise<UserEntity[]> {
        return await this.prisma.user.findMany({select:{id: true, pseudo: true}});
    }

    async getOne(id: number): Promise<UserEntity> {
        return await this.prisma.user.findUnique({where: {id}, select:{id: true, pseudo: true}});
    }

    async getMe(id: number): Promise<MineUserEntity> {
        return await this.prisma.user.findUnique({where: {id}, select:{id: true, pseudo: true, email: true}});
    }
}
