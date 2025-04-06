const amqp = require("amqplib");

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URI);
    const channel = await connection.createChannel();
    console.log("Connected to RabbitMQ");
    return { connection, channel, queue };
  } catch (error) {
    console.error("Error connecting to RabbitMQ", error);
    throw new Error("RabbitMQ connection error");
  }
}

