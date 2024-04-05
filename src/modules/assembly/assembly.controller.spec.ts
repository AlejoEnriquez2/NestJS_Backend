import { Test, TestingModule } from '@nestjs/testing';
import { AssemblyController } from './assembly.controller';
import { AssemblyService } from './assembly.service';

describe('AssemblyController', () => {
  let controller: AssemblyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssemblyController],
      providers: [AssemblyService],
    }).compile();

    controller = module.get<AssemblyController>(AssemblyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
