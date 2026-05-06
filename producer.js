const { kafka } = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();
  console.log("Connecting to producer...");

  await producer.connect();
  console.log("Connected to producer");

  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async function (line) {
    const [riderName, location] = line.split(" ");

    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          key: "location-updates",
          value: JSON.stringify({ riderName, location }),
          partition: location.toLowerCase() === "north" ? 0 : 1,
        },
      ],
    });
  }).on("close", async function () {
    console.log("Disconnecting producer...");
    await producer.disconnect();
  });
}

init();
