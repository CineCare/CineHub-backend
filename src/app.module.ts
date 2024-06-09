import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CinemasModule } from './cinemas/cinemas.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductionHousesModule } from './production-houses/production-houses.module';
import { AccessibilitiesModule } from './accessibilities/accessibilities.module';
import { StreamsModule } from './streams/streams.module';

@Module({
  imports: [
    CinemasModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    ProductionHousesModule,
    AccessibilitiesModule,
    StreamsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
