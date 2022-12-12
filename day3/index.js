import fs from 'fs';
import readline from 'readline';

const file = fs.createReadStream('./day3/input.txt');
const reader = readline.createInterface({
    input: file
});

const doubles = [];
let group = [];
reader.on('line', (text) => {
    const arr = Array.from(text);
    group.push(arr);
    if (group.length === 3) {
        const match = group[0].filter((char) => group[1].includes(char) && group[2].includes(char));
        doubles.push(match[0]);
        group = [];
    }
});

reader.on('close', () => {
    const res = doubles.reduce((accum, char) => {
        const value = char.charCodeAt(0);
        if (value >= 97) {
            console.log(char, accum + value - 96);
            return accum + value - 96;
        } else {
            console.log(char, accum + value - 64 + 26);
            return accum + value - 64 + 26;
        }
    }, 0);
    console.log(res);
});
