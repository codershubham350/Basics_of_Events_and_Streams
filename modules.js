/*console.log(arguments); // Arguments Array inside JS.
console.log(require("module").wrapper); // Internally node uses 'module' to sync or code with the IIFE function.
*/

// module.exports
const Calc = require("./test-module-1");
const calc1 = new Calc();
console.log(calc1.add(2, 5));

//exports
// const Calc2 = require("./test-module-2");
const { add, multiply, divide } = require("./test-module-2");
console.log(add(2, 5));
console.log(multiply(2, 5));
console.log(divide(2, 5));

// caching
// here module is loaded only one time and after that only module exported function are getting executed.
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
