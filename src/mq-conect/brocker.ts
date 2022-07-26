import * as mq from 'ibmmq';
import { MQC } from 'ibmmq';

let qName = 'DEV.QUEUE.1';
let gerenciador_de_filas = 'saturno';

const cno = <any>new mq.MQCNO();
const csp = new mq.MQCSP();
csp.UserId = '<user_aplication>';
csp.Password = '<token_aplication>';
cno.SecurityParms = csp;
cno.Options |= MQC.MQCNO_CLIENT_BINDING;
const cd = new mq.MQCD();
cd.ConnectionName = '<host_aplication>';
cd.ChannelName = '<chanelName_aplication>';
cno.ClientConn = cd;

if (MQC.MQCNO_CURRENT_VERSION >= 7) {
  cno.ApplName = 'Node.js 9.1.2 ApplName';
}

function formatErr(err: Error) {
  return `MQ call failed in ${err.message}`;
}

function toHexString(byteArray: Buffer) {
  return byteArray.reduce(
    (output, elem) => output + ('0' + elem.toString(16)).slice(-2),
    '',
  );
}

function putMessage(hObj: mq.MQObject, msg) {
  const mqmd = new mq.MQMD();
  const pmo = new mq.MQPMO();

  pmo.Options = [
    MQC.MQPMO_NO_SYNCPOINT,
    MQC.MQPMO_NEW_MSG_ID,
    MQC.MQPMO_NEW_CORREL_ID,
  ];

  mq.Put(hObj, mqmd, pmo, msg, function (err) {
    if (err) {
      console.log(formatErr(err));
    } else {
      console.log('MsgId: ' + toHexString(mqmd.MsgId));
      console.log('MQPUT successful');
    }
  });
}

function cleanup(hConn: mq.MQQueueManager, hObj: mq.MQObject) {
  mq.Close(hObj, 0, function (closeErr) {
    if (closeErr) {
      console.log(formatErr(closeErr));
    } else {
      console.log('MQCLOSE successful');
    }
    mq.Disc(hConn, function (discErr) {
      if (discErr) {
        console.log(formatErr(discErr));
      } else {
        console.log('MQDISC successful');
      }
    });
  });
}

const myArgs = process.argv.slice(2); // Remove redundant parms
if (myArgs[0]) {
  qName = myArgs[0];
}
if (myArgs[1]) {
  gerenciador_de_filas = myArgs[1];
}

export function publishMessageBrocker(msg) {
  mq.Connx(gerenciador_de_filas, cno, function (connErr, conn) {
    if (connErr) {
      console.log(formatErr(connErr));
    } else {
      console.log('MQCONN to %s successful ', gerenciador_de_filas);
      const od = new mq.MQOD();
      od.ObjectName = qName;
      od.ObjectType = MQC.MQOT_Q;
      const openOptions = MQC.MQOO_OUTPUT;

      mq.Open(conn, od, openOptions, function (openErr, hObj) {
        if (openErr) {
          console.log(formatErr(openErr));
        } else {
          putMessage(hObj, msg);
          console.log('MQOPEN of %s successful', qName);
        }
        cleanup(conn, hObj);
      });
    }
  });
}
