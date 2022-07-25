import * as mq from 'ibmmq';
import { MQC } from 'ibmmq';

const gerenciador_de_filas = 'saturno';

function formatErr(err: Error) {
  return `MQ call failed in ${err.message}`;
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// The program starts here.
// Connect to the queue manager.
console.log('Sample AMQSCONN.TS start');

// Create default MQCNO structure
const cno = <any>new mq.MQCNO();

// Add authentication via the MQCSP structure
const csp = new mq.MQCSP();
csp.UserId = 'lincongallo';
csp.Password = 'vehs0EFW1-LnwkJOvKI8c5LdbNx0QHjZq87FXUfEwGWW';
// Make the MQCNO refer to the MQCSP
// This line allows use of the userid/password
cno.SecurityParms = csp;

// And use the MQCD to programatically connect as a client
// First force the client mode
cno.Options |= MQC.MQCNO_CLIENT_BINDING;
// And then fill in relevant fields for the MQCD
const cd = new mq.MQCD();
cd.ConnectionName = 'saturno-5c7d.qm.us-south.mq.appdomain.cloud(32473)';
cd.ChannelName = 'CLOUD.ADMIN.SVRCONN';
// Make the MQCNO refer to the MQCD
cno.ClientConn = cd;

// MQ V9.1.2 allows setting of the application name explicitly
if (MQC.MQCNO_CURRENT_VERSION >= 7) {
  cno.ApplName = 'Node.js 9.1.2 ApplName';
}

export function test_mq() {
  // Now we can try to connect
  mq.Connx(gerenciador_de_filas, cno, function (connErr, conn) {
    if (connErr) {
      console.log(formatErr(connErr));
    } else {
      console.log('MQCONN to %s successful ', gerenciador_de_filas);
      // Sleep for a few seconds - bad in a real program but good for this one
      sleep(3 * 1000)
        .then(() => {
          mq.Disc(conn, function (discErr) {
            if (discErr) {
              console.log(formatErr(discErr));
            } else {
              console.log('MQDISC successful');
            }
          });
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch(() => {});
    }
  });
}
