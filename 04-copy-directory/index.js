const fs = require('fs/promises');
const path = require('path');
const srcPath = path.resolve(__dirname, 'files');
const destPath = path.resolve(__dirname, 'files-copy');

fs.rm(destPath, {force: true, recursive: true}).then(() => {
    fs.readdir(srcPath, (err) => {
        if (err) return err;

    }).then((files) => {

        fs.mkdir(destPath, {recursive: true}, (err) => {
            if (err) return err;
        }).then(() => {

            files.forEach((file) => {
                fs.copyFile(path.resolve(srcPath, file), path.resolve(destPath, file));
            });

        }).catch((err) => console.log(err.message));
    }).catch((err) => console.log(err.message));
});



