const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const colors = require('colors');
const { imageExtensions } = require('./constant');

async function changeFile(imagePath) {
    const fileExtension = path.extname(imagePath).toLowerCase();
    const webpPath = imagePath.replace(fileExtension, `.webp`);

    const originalSize = fs.statSync(imagePath).size;


    if (imageExtensions.includes(fileExtension)) {
        sharp(imagePath)
            .webp()
            .toFile(webpPath, (err) => {
                if (err) {
                    console.error(colors.bgRed(' - '), "Error: ", err.message);
                } else {

                    const newSize = fs.statSync(webpPath).size;
                    const percent = 100 - (newSize * 100 / originalSize);
                    console.log(colors.bgGreen(' + '), "Image converted successfully", colors.green(" | "), webpPath, colors.green(" | "), colors.underline.green(percent.toFixed(2).concat("% smaller")));
                }
            });

    } else {
        console.log("File is not an image");
    }
};




module.exports = {
    changeFile
};