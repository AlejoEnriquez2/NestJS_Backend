import { Module } from '@nestjs/common';
import { TestService } from './services/test.service';
import { TestController } from './controllers/test.controller';

@Module({
  providers: [TestService],
  controllers: [TestController]
})
export class TestModule {}
