import { Test, TestingModule } from '@nestjs/testing';
import { MinuteController } from './minute.controller';
import { MinuteService } from './minute.service';

describe('MinuteController', () => {
  let controller: MinuteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinuteController],
      providers: [MinuteService],
    }).compile();

    controller = module.get<MinuteController>(MinuteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
