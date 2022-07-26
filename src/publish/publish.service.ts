import { Injectable } from '@nestjs/common';
import { MessageDto } from 'src/dtos/publish.dto';
import { publishMessageBrocker } from 'src/mq-conect/brocker';

@Injectable()
export class PublishService {
  publishMessage(mensagem: MessageDto) {
    const msg = JSON.stringify(mensagem);

    return publishMessageBrocker(msg);
  }
}
