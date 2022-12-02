const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution #1
  // [The issue with this solution is node needs to load it in memory first then it can send
  //  the data(issue will be in case file it quite large so it would cause browser crash issue)]
  /*   fs.readFile("test-file.txt", (err, data) => {
      if (err) {
        console.log(err);
      }
      res.end(data);
    });*/

  // Solution #2: Streams
  // [The issue with this approach is the readable stream which we are using here is much much faster
  // than actually sending the result with the response writable stream over the network and this will
  // overwhelm the response stream which cannot handle the incoming data so fast and this is called backpressure]
  /*   const readable = fs.createReadStream("test-file.txt");
    readable.on("data", (chunk) => {
      res.write(chunk);
    });
    readable.on("end", () => {
      res.end();
    });
    readable.on("error", (err) => {
      console.log(err);
      res.statusCode = 500;
      res.end("File not found!");
    });*/

  // Solution #3
  // [This solution will work as we are reading and writing at the same pace using pipe()]
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  // readableSource.pipe(writableDestination)
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
