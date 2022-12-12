import fs from 'fs';
import readline from 'readline';

const file = fs.createReadStream('./day6/input.txt');
const reader = readline.createInterface({
    input: file
});
reader.on('line', (text) => {
    for (let i = 0; i < text.length - 14; i++) {
        const chunk = text.slice(i, i + 14);
        const set = new Set(chunk);
        if (set.size === 14) {
            console.log(i + 14);
            return;
        }
    }
});
