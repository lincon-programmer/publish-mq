import { MessageDto } from './../dtos/publish.dto';
import * as mqlight from 'mqlight';
const client = mqlight.createClient({
  service: '',
});

export class ConnectMq {
  sendMessage(topico: string, message: MessageDto) {
    client.on('started', function () {
      client.send(topico, message, function (err, data) {
        console.log('Sent: %s', data);
        client.stop();
      });
    });
  }
}
