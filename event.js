const EventEmitter = require("events");
const myEventEmitter = new EventEmitter();

myEventEmitter.on("tick", () => {
  console.log("This is tick, this has not stock");
});

myEventEmitter.on("tick", (stock) => {
  console.log("This is tick : " + stock);
});

myEventEmitter.emit("tick", [1, 2, 3]);

// ================================================================

const http = require("http");
const fs = require("fs");
const server = http.createServer();
const readable = fs.createReadStream("test.txt");

server.on("request", (req, res) => {
  console.log("Request from sever");
  readable.on("data", (chunk) => {
    console.log(chunk);
    res.write(chunk);
  });

  readable.on("end", () => {
    res.end();
  });

  // readable.on("error", (err) => {
  //   res.write(err);
  //   res.end();
  // });
});

server.on("close", (req, res) => {
  console.log("server closed");
});

server.listen(9000, () => {
  console.log("waiting for request ..." + 9000);
});

// ================================================================
