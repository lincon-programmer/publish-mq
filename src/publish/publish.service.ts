import { Injectable } from '@nestjs/common';
import { MessageDto } from 'src/dtos/publish.dto';

@Injectable()
export class PublishService {
  publishMessage(mensagem: MessageDto): string {
    console.log(mensagem);
    return 'Mensagem enviada com sucesso';
  }
}
