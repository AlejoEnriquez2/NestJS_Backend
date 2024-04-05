import { Test, TestingModule } from '@nestjs/testing';
import { MovementHeaderController } from './movement-header.controller';
import { MovementHeaderService } from './movement-header.service';

describe('MovementHeaderController', () => {
  let controller: MovementHeaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovementHeaderController],
      providers: [MovementHeaderService],
    }).compile();

    controller = module.get<MovementHeaderController>(MovementHeaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
