const kafka = require('kafka-node');
const bp = require('body-parser');
const config = require('./config');

try {
  const Producer = kafka.Producer;
  const client = new kafka.KafkaClient({kafkaHost:config.kafka_server});
  const producer = new Producer(client);
  console.log(config.kafka_topic);
  let payloads1 = [
    {
      topic: config.kafka_topic,
      messages: 'message partition 0',
    }
  ];
  let payloads2 = [
    {
      topic: config.kafka_topic,
      messages: 'message partition 1',
      partition: 1
    }
  ];

  producer.on('ready', async function() {
    for(let i=0; i<10; i++){
      let push_status = producer.send(i%2 == 0 ? payloads1 : payloads2, (err, data) => {
        if (err) {
          console.log('[kafka-producer -> '+config.kafka_topic+']: broker update failed');
        } else {
          console.log('[kafka-producer -> '+config.kafka_topic+']: broker update success');
          console.log(i%2);
        }
      });
    }
  });

  producer.on('error', function(err) {
    console.log(err);
    console.log('[kafka-producer -> '+config.kafka_topic+']: connection errored');
    throw err;
  });
}
catch(e) {
  console.log(e);
}