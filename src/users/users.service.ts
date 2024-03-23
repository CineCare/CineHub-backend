import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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

    async updatePref(prefId: number, reqUserId: number, body: PrefUpdateDTO): Promise<PrefEntity> {
        const prefUserId = (await this.prisma.prefs.findUniqueOrThrow({where: {id: prefId}, select: {userId: true}})).userId;
        if(prefUserId !== reqUserId) {
            throw new UnauthorizedException("Vous ne pouvez pas éditer ces préférences");
        }
        return await this.prisma.prefs.update({where: {id: prefId}, data: body});
    }

    async deletePref(prefId: number, reqUserId: number): Promise<void> {
        const prefUserId = (await this.prisma.prefs.findUniqueOrThrow({where: {id: prefId}, select: {userId: true}})).userId;
        if(prefUserId !== reqUserId) {
            throw new UnauthorizedException("Vous ne pouvez pas supprimer ces préférences");
        }
        await this.prisma.prefs.delete({where: {id: prefId}});
    }
}
