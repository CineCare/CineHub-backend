import { Test, TestingModule } from '@nestjs/testing';
import { ProductionHousesService } from '../production-houses.service';

describe('ProductionHousesService', () => {
  let service: ProductionHousesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionHousesService],
    }).compile();

    service = module.get<ProductionHousesService>(ProductionHousesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
