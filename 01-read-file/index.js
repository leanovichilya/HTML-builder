const fs = require('fs');
const path = require('path');

let data = '';

const readStream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), {encoding: 'utf-8'});

readStream.on('data', (chunk) => data += chunk);
readStream.on('end', () => console.log(data));
