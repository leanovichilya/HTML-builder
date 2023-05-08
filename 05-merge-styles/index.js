const fs = require('fs');
const path = require('path');

let srcPath = path.resolve(__dirname, 'styles');
const destPath = path.resolve(__dirname, 'project-dist');

const rmPromise = (path) => {
    return new Promise((resolve, reject) => fs.rm(path, {recursive: true, force: true}, (err) => {
        if (err) return reject(err.message);
        resolve();
    }));
};

const readDirPromise = (path) => {
    return new Promise((resolve, reject) => fs.readdir(path, (err, files) => {
        if (err) return reject(err.message);
        resolve(files);
    }));
};

rmPromise(path.resolve(destPath, 'bundle.css'))
    .then(() => readDirPromise(srcPath))
    .then((files) => {
        files.forEach((file) => {
            if (path.extname(file) === '.css') {
                const streamRead = fs.createReadStream(path.resolve(srcPath, file), {encoding: 'utf-8'});
                const streamWrite = fs.createWriteStream(path.resolve(destPath, 'bundle.css'), {flags: 'a'});
                streamRead.on('data', (chunk) => streamWrite.write(chunk));
            }
        });
    });
