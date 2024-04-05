import { Test, TestingModule } from '@nestjs/testing';
import { MovementHeaderService } from './movement-header.service';

describe('MovementHeaderService', () => {
  let service: MovementHeaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovementHeaderService],
    }).compile();

    service = module.get<MovementHeaderService>(MovementHeaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
