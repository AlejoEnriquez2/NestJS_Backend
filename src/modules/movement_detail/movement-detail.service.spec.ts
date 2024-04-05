import { Test, TestingModule } from '@nestjs/testing';
import { MovementDetailService } from './movement-detail.service';

describe('MovementDetailService', () => {
  let service: MovementDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovementDetailService],
    }).compile();

    service = module.get<MovementDetailService>(MovementDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
