import fs from 'fs';
import readline from 'readline';

const file = fs.createReadStream('./day5/input.txt');
const reader = readline.createInterface({
    input: file
});
let state = 'start';
const rows = {};
reader.on('line', (text) => {
    if (text === '') {
        return;
    }
    if (!text.includes('[') && state === 'start') {
        state = 'move';
        return;
    }
    if (state === 'start') {
        let num = 1;
        while (text.length > ((num - 1) * 4) + 1) {
            if (!rows[num]) {
                rows[num] = [];
            }
            if (text.charAt(((num - 1) * 4) + 1) !== ' ') {
                rows[num].push(text.charAt(((num - 1) * 4) + 1));
            }
            num++;
        }
    }
    if (state === 'move') {
        const [, amount, start, end] = text.split(/move\s|\sfrom\s|\sto\s|\s/);
        const removed = rows[start].splice(0, amount);
        rows[end].splice(0, 0, ...removed);
    }
});

reader.on('close', () => {
    const res = Object.values(rows).reduce((accum, row) => accum + row[0], '');
    console.log(res);
});
