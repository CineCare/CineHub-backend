import { Module } from '@nestjs/common';
import { ProductionHousesController } from './production-houses.controller';
import { ProductionHousesService } from './production-houses.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ProductionHousesController],
  providers: [ProductionHousesService],
  imports: [PrismaModule],
})
export class ProductionHousesModule {}
