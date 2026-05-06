const { kafka } = require("./client");

async function init() {
  const admin = kafka.admin();
  console.log("Connecting to Kafka...");

  await admin.connect();
  console.log("Connected to Kafka");

  console.log("Creating topic [rider-updates]...");
  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
      },
    ],
  });

  console.log("topic created success [rider-updates]...");

  console.log("Disconnecting admin...");

  await admin.disconnect();
}

init();
