const fs = require("fs");
const crypto = require("crypto");

// As per the flow of execution (priority basis)
// Expired timer callbacks -> I/O Polling and callbacks -> setImmediate callbacks -> Close callbacks
// After completion of every process the most priority is given to process.nextTick() and promises [If they exists]

const start = Date.now();

// By default we have 4 Thread Pool and we can alter the size by using below method
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => {
  console.log("Timer 1 finished"); // Executed 2nd
}, 0);

setImmediate(() => {
  console.log("Immediate 1 finished"); // Executed 3rd
});

fs.readFile("test-file.txt", () => {
  console.log("I/O finished"); // Executed 4th

  console.log("-----------------------------");

  setTimeout(() => {
    console.log("Timer 2 finished"); // Executed 7th
  }, 0);

  setTimeout(() => {
    console.log("Timer 3 finished"); // Executed 8th
  }, 3000);

  setImmediate(() => {
    console.log("Immediate 2 finished"); // Executed 6th
  });

  process.nextTick(() => console.log("Process.nextTick finished")); // Executed 5th

  /* ---------------THREAD POOL----------------------------*/

  // Instance #1
  /*   crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
      console.log("Password Encrypted Async 1");
      console.log("Time Elapsed for 1 in ms: ", Date.now() - start);
    });*/
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log("Password Encrypted Sync 1");
  console.log("Time Elapsed for 1 in ms", Date.now() - start);

  // Instance #2
  /*   crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
      console.log("Password Encrypted Async 2");
      console.log("Time Elapsed for 2 in ms: ", Date.now() - start);
    });*/
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log("Password Encrypted Sync 2");
  console.log("Time Elapsed for 2 in ms", Date.now() - start);

  // Instance #3
  /*   crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
      console.log("Password Encrypted Async 3");
      console.log("Time Elapsed for 3 in ms: ", Date.now() - start);
    });*/
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log("Password Encrypted Sync 3");
  console.log("Time Elapsed for 3 in ms", Date.now() - start);

  // Instance #4
  /*   crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
      console.log("Password Encrypted Async 4");
      console.log("Time Elapsed for 4 in ms: ", Date.now() - start);
    });*/

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log("Password Encrypted Sync 4");
  console.log("Time Elapsed for 4 in ms", Date.now() - start);
});

console.log("Hello from top-level code"); // Executed 1st
