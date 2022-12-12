import fs from 'fs';
import readline from 'readline';

const file = fs.createReadStream('./day2/input.txt');
const reader = readline.createInterface({
    input: file
});

// const values = {
//     'X': 1,
//     'Y': 2,
//     'Z': 3,
// }

const values2 = {
    X: 0,
    Y: 3,
    Z: 6
};

// const scores = {
//     'X': {
//         'A': 3,
//         'B': 0,
//         'C': 6
//     },
//     'Y': {
//         'A': 6,
//         'B': 3,
//         'C': 0
//     },
//     'Z': {
//         'A': 0,
//         'B': 6,
//         'C': 3
//     }
// }

const scores2 = {
    X: {
        A: 3,
        B: 1,
        C: 2
    },
    Y: {
        A: 1,
        B: 2,
        C: 3
    },
    Z: {
        A: 2,
        B: 3,
        C: 1
    }
};

let lastSum = 0;
reader.on('line', (text) => {
    const [left, right] = text.split(' ');
    lastSum += values2[right] + scores2[right][left];
});

reader.on('close', () => {
    console.log(lastSum);
});
