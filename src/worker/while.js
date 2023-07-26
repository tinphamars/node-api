const { parentPort } = require("node:worker_threads");

const now = Date.now();
while (Date.now() - now < 7000) {}

parentPort.postMessage(true);
