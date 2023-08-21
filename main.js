#! /usr/bin/env node

const { Command } = require("commander");
const figlet = require('figlet');
const fs = require('fs');
const colors = require('colors');
const { changeFile, findAndChangeFiles } = require("./src");

console.log("");
const program = new Command();

console.log(colors.red(figlet.textSync("wW")), colors.underline.red("Webp Wizard"), "\n");

program
    .version("1.0.0")
    .description("Minimaze your images with webp format")
    .argument('<imagePath>', 'Path to the image file')
    .action((path) => {
        fs.stat(path, async (err, stats) => {
            if (err) {
                console.error('Hata:', err.message);
                return;
            }
            if (stats.isFile()) {
                await changeFile(path);
            } else if (stats.isDirectory()) {
                await findAndChangeFiles(path);
            } else {
                console.log('Belirtilen yol ne bir dosya ne de bir klasördür.');
            }
        });
    })
    .parse(process.argv);




