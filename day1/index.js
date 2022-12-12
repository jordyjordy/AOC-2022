import fs from 'fs';
import readline from 'readline';

const file = fs.createReadStream('./day1/input.txt');
const reader = readline.createInterface({
    input: file
});

const elfArray = [];
let lastSum = 0;
reader.on('line', (text) => {
    if (text.length === 0) {
        elfArray.push(lastSum);
        lastSum = 0;
    } else {
        lastSum += parseInt(text);
    }
});

reader.on('close', (x) => {
    elfArray.sort((a, b) => {
        if (a > b) {
            return 1;
        }
        return a === b
            ? 0
            : -1;
    });
    console.log(elfArray[elfArray.length - 1] + elfArray[elfArray.length - 2] + elfArray[elfArray.length - 3]);
});
