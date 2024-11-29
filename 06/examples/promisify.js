const fs = require('fs');

// ************************************ 1 ************************************************

fs.readDir('./examples', (err, files) => {
    // do smth with files
    console.log(files);
})

// ************************************ 2 ************************************************

function promisifiedReadDir(dir) {
    return new Promise((resolve, reject) => {
        fs.readDir(dir, (err, files) => {
            if(err) return reject(err)
            else resolve(files);
        });
    })
}

promisifiedReadDir(dir).then(files => {
    // do smth with files
    console.log(files);
});

// ************************************ 3 ************************************************

function mapper(resolve, reject) {
    return (err, files) => {
        if(err) return reject(err)
        else resolve(files);
    }
}
function promisifiedReadDir(dir) {
    return new Promise((resolve, reject) => {
        fs.readDir(dir, mapper(resolve, reject));
    })
}

promisifiedReadDir(dir).then(files => {
    // do smth with files
    console.log(files);
});
