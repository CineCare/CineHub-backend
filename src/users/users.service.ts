import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { MineUserEntity } from './entities/mineUser.etity';
import { PrefEntity } from './entities/prefs.entity';
import { PrefDTO } from './DTO/pref.dto';
import { PrefUpdateDTO } from './DTO/prefUpdate.dto';

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
        return await this.prisma.user.findUnique({where: {id}, select:{id: true, pseudo: true, email: true, prefs: {select: {id: true, name: true, theme: true, images: true, audio: true, helpLevel: true}}}});
    }

    async createPref(id: number, body: PrefDTO): Promise<PrefEntity> {
        return await this.prisma.prefs.create({data: {userId: id, ...body}});
    }

    async updatePref(id: number, body: PrefUpdateDTO): Promise<PrefEntity> {
        return await this.prisma.prefs.update({where: {id}, data: body});
    }
}
