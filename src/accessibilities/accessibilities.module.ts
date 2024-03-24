import { Module } from '@nestjs/common';
import { AccessibilitiesController } from './accessibilities.controller';
import { AccessibilitiesService } from './accessibilities.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AccessibilitiesController],
  providers: [AccessibilitiesService],
  imports: [PrismaModule]
})
export class AccessibilitiesModule {}
