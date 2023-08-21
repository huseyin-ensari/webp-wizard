const fs = require('fs').promises;
const path = require('path');
const { changeFile } = require('./changeFile');
const { imageExtensions } = require('./constant');

async function findAndChangeFiles(folderPath) {

    const files = await fs.readdir(folderPath);
    const islemler = files.map(async dosya => {
        const imagePath = path.join(folderPath, dosya);
        const fileExtension = path.extname(imagePath).toLowerCase();
        if (imageExtensions.includes(fileExtension)) {
            await changeFile(imagePath);
        }
    });

    await Promise.all(islemler);
};

module.exports = {
    findAndChangeFiles
};
