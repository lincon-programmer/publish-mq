import { PublishService } from './publish.service';
import { Module } from '@nestjs/common';
import { PublishController } from './publish.controller';

@Module({
  imports: [],
  controllers: [PublishController],
  providers: [PublishService],
})
export class PublishModule {}
