import { Kafka } from "kafkajs";

const clientId = "simple-client-id";
const brokers = ["localhost:9092"];
const topic = "test-topic";

const kafka = new Kafka({
  clientId,
  brokers,
});

const consumer = kafka.consumer({ groupId: "test-group" });

const consume = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const value = message.value as any;
        console.log({
          value: value.toString(),
        });
      },
    });
  } catch (error) {
    console.error(error);
  }
};

consume();
