import { Test, TestingModule } from '@nestjs/testing';
import { ExtraordinaryValueService } from './extraordinary-value.service';

describe('ExtraordinaryValueService', () => {
  let service: ExtraordinaryValueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtraordinaryValueService],
    }).compile();

    service = module.get<ExtraordinaryValueService>(ExtraordinaryValueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
