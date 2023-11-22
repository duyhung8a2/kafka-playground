import { Kafka } from "kafkajs";
import "dotenv/config";

const clientId = "simple-client-id";
const brokers = ["localhost:9092"];
const topic = "test-topic";

const kafka = new Kafka({
  clientId,
  brokers,
});

const producer = kafka.producer();

let counter = 0;

const produce = async () => {
  counter++;
  try {
    await producer.connect();
    await producer.send({
      topic: topic,
      messages: [{ key: "key1", value: "hello world " + counter }],
    });
    console.log("produced successfully");
  } catch (error) {
    console.error(error);
  } finally {
    await producer.disconnect();
  }
};

setInterval(produce, 2000);
