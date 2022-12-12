import fs from 'fs';
import readline from 'readline';
const file = fs.createReadStream('./day10/input.txt');
const reader = readline.createInterface({
    input: file
});
// const keyCycles = [20, 60, 100, 140, 180, 220]

let cycle = 1;
let X = 1;
const sum = [];
let line = '';
// const checkCycle = () => {
//     if (keyCycles.includes(cycle)) {
//         sum.push(X*cycle);
//     }
// }

const checkPixel = () => {
    const modulatedCycle = ((cycle - 1) % 40) + 1;
    if (modulatedCycle >= X && modulatedCycle <= (X + 2)) {
        line += '#';
    } else {
        line += '.';
    }
    if (modulatedCycle === 40) {
        console.log(line);
        line = '';
    }
};
reader.on('line', (text) => {
    checkPixel();
    if (text === 'noop') {
        cycle++;
    } else {
        const [, val] = text.split(' ');
        const num = parseInt(val);
        cycle++;
        checkPixel();
        cycle++;
        X += num;
    }
});

reader.on('close', () => {
    console.log(sum);
    console.log(sum.reduce((partial, val) => partial + val, 0));
});
