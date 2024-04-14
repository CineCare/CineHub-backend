import { Test, TestingModule } from '@nestjs/testing';
import { ProductionHousesController } from '../production-houses.controller';

describe('ProductionHousesController', () => {
  let controller: ProductionHousesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionHousesController],
    }).compile();

    controller = module.get<ProductionHousesController>(
      ProductionHousesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
