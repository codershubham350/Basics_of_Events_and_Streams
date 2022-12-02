const EventEmitter = require("events");
const http = require("http");

// Handling events using classes
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

// Event Listener 1st statement, listening event
myEmitter.on("newSale", () => {
  console.log("There was a new sale");
});

// Event Listener 2nd statement, listening event
myEmitter.on("newSale", () => {
  console.log("Customer name: John Doe");
});

// Event Listener 3rd statement, listening event and also handling the arguments
myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock`);
});

// Event Emitter, emiting event
myEmitter.emit("newSale", 9);

/*  ------------------------HTTP MODULES------------------------------------ */

const server = http.createServer();

// Listening to an event
server.on("request", (req, res) => {
  console.log("Request received");
  console.log(req.url);
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Another received 😁");
});

server.on("close", () => {
  console.log("Server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
