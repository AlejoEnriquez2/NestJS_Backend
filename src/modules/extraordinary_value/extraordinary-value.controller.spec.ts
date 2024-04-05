import { Test, TestingModule } from '@nestjs/testing';
import { ExtraordinaryValueController } from './extraordinary-value.controller';
import { ExtraordinaryValueService } from './extraordinary-value.service';

describe('ExtraordinaryValueController', () => {
  let controller: ExtraordinaryValueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExtraordinaryValueController],
      providers: [ExtraordinaryValueService],
    }).compile();

    controller = module.get<ExtraordinaryValueController>(ExtraordinaryValueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
