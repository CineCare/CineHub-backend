import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthEntity } from './entities/auth.entity';


//TODO set in .env
export const roundsOfHashing = 10;

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async login(email: string, password: string): Promise<AuthEntity> {
        const user = await this.prisma.user.findUnique({where:{email}});
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!user || !isPasswordValid) {
            throw new UnauthorizedException("Incorrect email and/or password !");
        }
        return {
            accessToken: this.jwtService.sign({ userId: user.id })
        };
    }

    async register(pseudo: string, email: string, password: string): Promise<AuthEntity> {
        const hash = await bcrypt.hash(password, roundsOfHashing);
        
        const user = await this.prisma.user.create({ data: {pseudo, email, password: hash}});
        return {
            accessToken: this.jwtService.sign({ userId: user.id })
        }
    }
}
