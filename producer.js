const { kafka } = require("./client");

async function init() {
  const producer = kafka.producer();
  console.log("Connecting to producer...");

  await producer.connect();
  console.log("Connected to producer");

  await producer.send({
    topic: "rider-updates",
    messages: [
        { key: "rider-1", value: "Rider 1 is on the way!" , partition: 0},
        { key: "rider-2", value: "Rider 2 is waiting for pickup!" , partition: 1},
    ],
  });
  console.log("Messages sent successfully");

  await producer.disconnect();
}

init();