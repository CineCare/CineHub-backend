import { Test, TestingModule } from '@nestjs/testing';
import { AccessibilityController } from '../accessibility.controller';

describe('AccessibilityController', () => {
  let controller: AccessibilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessibilityController],
    }).compile();

    controller = module.get<AccessibilityController>(AccessibilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
