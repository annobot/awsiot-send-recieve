const awsIot = require("aws-iot-device-sdk");
require('dotenv').config()

const { sendForNSeconds, generateUniqueNumbersArray } = require("./utils");
const { deviceClientConfig } = require("./config");
const { TOPIC, DEVICE_EVENTS } = require("./constants");

const device = awsIot.device(deviceClientConfig);

device.on(DEVICE_EVENTS.CONNECT, () => {
  console.log("✅ Connected to AWS IoT Core");

  // Subscribe to a topic
  device.subscribe(TOPIC, () => {
    console.log("📡 Subscribed to temperaturesensor/data");
  });

  // Publish a message
  const dummySensors = generateUniqueNumbersArray(10, 23, 47);
  dummySensors.forEach((deviceId) => {
    sendForNSeconds(1, () => publish(deviceId));
  });
});

// Handle incoming messages
device.on(DEVICE_EVENTS.MESSAGE, (topic, payload) => {
  console.log(`📩 Message received on ${topic}:`, payload.toString());
});

// Handle errors
device.on(DEVICE_EVENTS.ERROR, (error) => {
  console.error("❌ Error:", error);
});

const publish = (deviceId) => {
  const randomTemperature = Math.floor(Math.random() * 60) + 1;
  const payload = JSON.stringify({
    deviceId,
    temperature: randomTemperature,
    feel: randomTemperature > 30 ? "hot" : "cold",
    localtion: "india",
    timeStamp: Date.now(),
  });
  console.log("🚀 Publishing message:", payload);
  device.publish(TOPIC, payload);
};

// Handle disconnect
device.on(DEVICE_EVENTS.CLOSE, () => console.log("🔴 Connection closed"));
device.on(DEVICE_EVENTS.RECONNECT, () => console.log("♻️ Reconnecting..."));
device.on(DEVICE_EVENTS.OFFLINE, () => console.log("⚠️ Device offline"));
device.on(DEVICE_EVENTS.END, () => console.log("🔚 Connection ended"));
