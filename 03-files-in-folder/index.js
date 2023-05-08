const fs = require('fs/promises');
const path = require('path');
const pathFolder = path.resolve(__dirname, 'secret-folder');

fs.readdir(pathFolder, {withFileTypes: true}, (err) => {
    if(err) return err.message;
}).then((files) => {
    const typeFiles = [];

    files.forEach((file) => {
        if (file.isFile()) {
            typeFiles.push(file.name);
        }
    });

    return typeFiles;
}).then((typeFiles) => {
    typeFiles.forEach((type) => {
        fs.stat(path.resolve(pathFolder, type), (err) => {
        }).then((stats) => {
            console.log([...type.split('.'), (Math.round(stats.size / 1024 * 100) / 100) + 'kb'].join(' - '));
        }).catch(err => console.log(err));
    });
});