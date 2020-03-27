let message = require('./main').message;
exports.count = 5;
console.log('first time:', message);
setTimeout(() => console.log('second time:', message), 0);