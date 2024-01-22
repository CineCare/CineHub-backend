import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CinemasModule } from './cinemas/cinemas.module';
import { CinemasController } from './cinemas/cinemas.controller';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CinemasModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
