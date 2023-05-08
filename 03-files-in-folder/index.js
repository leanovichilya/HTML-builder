const fs = require('fs/promises');
const path = require('path');

fs.readdir(path.resolve(__dirname, 'secret-folder'), {withFileTypes: true}, (err) => {
    if(err) return err.message;
}).then((files) => {
    const typeFiles = [];

    files.forEach((file) => {
        if (file.isFile()) {
            typeFiles.push(file.name);
        }
        return typeFiles;
    });

    return typeFiles;
}).then((typeFiles) => {
    typeFiles.forEach((type) => {
        fs.stat(path.resolve(__dirname, 'secret-folder', type), (err) => {
        }).then((stats) => {
            console.log([...type.split('.'), (Math.round(stats.size / 1024 * 100) / 100) + 'kb'].join(' - '));
        }).catch(err => console.log(err));
    });
});