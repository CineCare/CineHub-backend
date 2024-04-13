import { Module } from '@nestjs/common';
import { CinemasController } from './cinemas.controller';
import { CinemasService } from './cinemas.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CinemasController],
  providers: [CinemasService],
  imports: [PrismaModule],
})
export class CinemasModule {}
