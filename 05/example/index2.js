const fs = require('fs');

const readable = fs.createReadStream('./100mb-1.txt');
const output = fs.createWriteStream('./new.txt');

readable.pipe(output);
