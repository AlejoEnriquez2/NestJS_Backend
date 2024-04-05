import { Test, TestingModule } from '@nestjs/testing';
import { MovementDetailController } from './movement-detail.controller';
import { MovementDetailService } from './movement-detail.service';

describe('MovementDetailController', () => {
  let controller: MovementDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovementDetailController],
      providers: [MovementDetailService],
    }).compile();

    controller = module.get<MovementDetailController>(MovementDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
