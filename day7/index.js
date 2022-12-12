import fs from 'fs';
import readline from 'readline';
import { isObject, set } from 'lodash-es';
const file = fs.createReadStream('./day7/input.txt');
const reader = readline.createInterface({
    input: file
});

const directories = {};

const dirArray = [];

const cdRegex = /^\$\scd/;

const lsRegex = /^\$\sls/;

const dirRegex = /^dir/;

reader.on('line', (text) => {
    if (lsRegex.test(text) || dirRegex.test(text)) {
        return;
    }
    if (cdRegex.test(text)) {
        const dir = text.slice(5);
        if (dir === '..') {
            dirArray.pop();
        } else {
            dirArray.push(dir);
        }
    } else {
        const [val, name] = text.split(' ');
        set(directories, [...dirArray, name], parseInt(val));
    }
});

const getSizesRecursively = (obj, path) => {
    let returnObj = {};
    let sum = 0;
    Object.entries(obj).forEach(([key, value]) => {
        if (isObject(value)) {
            const [val, dirs] = getSizesRecursively(value, `${path}.${key}`);
            sum += val;
            returnObj = { ...returnObj, ...dirs, [`${path}.${key}`]: val };
        } else {
            sum += value;
        }
    });
    return [sum, returnObj];
};

// const limit = 100000;

reader.on('close', () => {
    const [totalSize, directorySizes] = getSizesRecursively(directories);
    const freespace = 70000000 - totalSize;
    const toBeFreed = 30000000 - freespace;
    const smallestNeeded = Object.values(directorySizes).sort((a, b) => a - b).reduce((accum, val) => {
        if (accum) {
            return accum;
        }
        if (val >= toBeFreed) {
            return val;
        }
        return accum;
    }, undefined);
    console.log(smallestNeeded);
});
