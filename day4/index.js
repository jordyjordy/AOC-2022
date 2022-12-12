import fs from 'fs';
import readline from 'readline';

const file = fs.createReadStream('./day4/input.txt');
const reader = readline.createInterface({
    input: file
});

let count = 0;
reader.on('line', (text) => {
    const [l1, r1, l2, r2] = text.split(/[-,]/).map((x) => parseInt(x));
    if (l1 <= l2 && r1 >= l2) {
        count++;
    } else if (l1 >= l2 && l1 <= r2) {
        count++;
    }
});

reader.on('close', () => {
    console.log(count);
});
