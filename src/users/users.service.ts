import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { MineUserEntity } from './entities/mineUser.etity';
import { PrefEntity } from './entities/prefs.entity';
import { PrefDTO } from './DTO/pref.dto';
import { PrefUpdateDTO } from './DTO/prefUpdate.dto';
import { UpdateUserDTO } from './DTO/userUpdate.dto';
import * as bcrypt from 'bcrypt';

//TODO set in .env
export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getList(): Promise<UserEntity[]> {
        return await this.prisma.user.findMany({select:{id: true, pseudo: true}});
    }

    async getOne(id: number): Promise<UserEntity> {
        return await this.prisma.user.findUniqueOrThrow({where: {id}, select:{id: true, pseudo: true}});
    }

    async getMe(id: number): Promise<MineUserEntity> {
        return await this.prisma.user.findUnique({where: {id}, select:{id: true, pseudo: true, email: true, prefs: {select: {id: true, name: true, theme: true, images: true, audio: true, helpLevel: true}}}});
    }

    async updateMe(id: number, data: UpdateUserDTO): Promise<UserEntity> {
        const newData = {};
        if(data.actualPassword) {
            const crypt = await bcrypt.hash(data.actualPassword, roundsOfHashing);
            const storedCrypt = (await this.prisma.user.findUnique({where: {id}, select: { password: true}})).password;
            if(await bcrypt.compare(crypt, storedCrypt)) {
                throw new BadRequestException("Le mot de passe actuel est invalide");
            }
            if(!data.newPassword || !data.newPasswordConfirm) {
                throw new BadRequestException("Pour changer de mot de passe, vous devez renseigner le nouveau mot de passe et le confirmer");
            }
            if(data.newPassword !== data.newPasswordConfirm) {
                throw new BadRequestException("Le nouveau mot de passe et la confirmation sont différents");
            }
            Object.defineProperty(newData, 'password', {value: crypt});
        }
        if(data.pseudo) {
            Object.defineProperty(newData, 'pseudo', {value: data.pseudo});
        }
        const newUser = await this.prisma.user.update({where: {id}, data: newData});
        return {id: newUser.id, pseudo: newUser.pseudo, email: newUser.email}
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
