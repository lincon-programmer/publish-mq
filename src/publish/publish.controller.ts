import { Body, Controller, Post } from '@nestjs/common';
import { MessageDto } from 'src/dtos/publish.dto';
import { PublishService } from './publish.service';

@Controller('publish')
export class PublishController {
  constructor(private readonly publishService: PublishService) {}

  @Post()
  publishMessage(@Body() messageDto: MessageDto): string {
    return this.publishService.publishMessage(messageDto);
  }
}
