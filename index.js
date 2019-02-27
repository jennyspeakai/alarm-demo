
/*const hello_world = require('bindings')('hello_world')

console.log(hello_world.sayHi());*/

const testAddon = require('./build/Release/testaddon.node');

//console.log(testAddon.greet('Sam');
console.log('addon', testAddon);
console.log(testAddon.hello());
console.log(testAddon.add(8, 7));

module.exports = testAddon;
