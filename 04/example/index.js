const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const output = fs.createWriteStream('./zipped.zip');
const archive = archiver('zip', {
    zlib: {level: 9}
})

archive.pipe(output);

fs.readdir('./examples', (err, files) => {
    for(const file of files) {
        const filePath = path.join(__dirname, 'examples', file);
        archive.append(fs.createReadStream(filePath), {name: file})
    }
})

console.log(__dirname);
console.log(__filename)