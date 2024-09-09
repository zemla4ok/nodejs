const crypto = require('crypto')

function doHeavyStuff(item) {
  crypto.createHmac('sha256', 'secret').update(new Array(10000).fill(item).join('.')).digest('hex')
}

const arr = new Array(200).fill('something')
doHeavyStuff(arr);

let interval = setInterval(() => {
  console.log('tick!')
  if (arr.length === 0) {
    clearInterval(interval)
    console.log('finalized tick')
  }
}, 0);


function processChunk() {
  if (arr.length === 0) {
        console.log('finalized')
        // код, выполняющийся после обработки всего массива
  } else {
    console.log('processing chunk');
    // выберем 10 элементов и удалим их из массива
    const subarr = arr.splice(0, 10)
    for (const item of subarr) {
      doHeavyStuff(item)
    }
    // поставим функцию в очередь
    setImmediate(processChunk)
  }
}
processChunk()