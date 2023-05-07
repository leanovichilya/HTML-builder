const fs = require('fs');
const path = require('path');

const {stdin} = process;

fs.writeFile(path.resolve(__dirname, 'text.txt'), '', {encoding: 'utf-8'}, () => {
    console.log('Hello. File was created. Enter message below:');
});

stdin.on('data', (chunk) => {
    fs.appendFile(path.resolve(__dirname, 'text.txt'), chunk, 'utf-8', (err) => {
        if (err) console.log(err.message);
    });

    if (chunk.toString().slice(0,4) === 'exit') {
        console.log('Goodbye!');
        process.exit();
    }
});

process.on('SIGINT', () => {
    console.log('Goodbye');
    process.exit();
});