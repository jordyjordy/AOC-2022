import fs from 'fs';
import readline from 'readline';
const file = fs.createReadStream('./day9/input.txt');
const reader = readline.createInterface({
    input: file
});
const rope = new Array(10).fill('').map(() => { return [0, 0] });
const getNewHeadPos = (knot, direction) => {
    switch (direction) {
    case 'U': return [knot[0], knot[1] + 1];
    case 'D': return [knot[0], knot[1] - 1];
    case 'L': return [knot[0] - 1, knot[1]];
    case 'R': return [knot[0] + 1, knot[1]];
    default: return [knot[0], knot[1]];
    }
};

const distance = (a, b) => {
    return [Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1])];
};

const getNewKnotPos = (knot, parentKnot) => {
    const distanceMatrix = distance(knot, parentKnot);
    if (distanceMatrix[0] <= 1 && distanceMatrix[1] <= 1) {
        return knot;
    }
    const returnKnot = [knot[0], knot[1]];
    if (distanceMatrix[0] > 1) {
        if (returnKnot[0] < parentKnot[0]) {
            returnKnot[0] = parentKnot[0] - 1;
        } else {
            returnKnot[0] = parentKnot[0] + 1;
        }
        if (returnKnot[1] < parentKnot[1]) {
            returnKnot[1] += 1;
        } else if (returnKnot[1] > parentKnot[1]) {
            returnKnot[1] -= 1;
        }
    } else if (distanceMatrix[1] > 1) {
        if (returnKnot[1] < parentKnot[1]) {
            returnKnot[1] = parentKnot[1] - 1;
        } else {
            returnKnot[1] = parentKnot[1] + 1;
        }
        if (returnKnot[0] < parentKnot[0]) {
            returnKnot[0] += 1;
        } else if (returnKnot[0] > parentKnot[0]) {
            returnKnot[0] -= 1;
        }
    }
    return returnKnot;
};

const tailPositions = [[0, 0]];

reader.on('line', (text) => {
    const [dir, length] = text.split(' ');
    const lengthNum = parseInt(length);
    for (let i = 0; i < lengthNum; i++) {
        const parentKnotPos = getNewHeadPos(rope[0], dir);
        rope[0] = parentKnotPos;
        for (let i = 1; i < rope.length; i++) {
            const newKnotPos = getNewKnotPos(rope[i], rope[i - 1]);
            rope[i] = newKnotPos;
        }
        tailPositions.push(rope[9]);
    }
});

reader.on('close', () => {
    const uniqueTailPositions = tailPositions.filter((tailPos, index) => {
        const foundIndex = tailPositions.findIndex(([x, y]) => {
            return x === tailPos[0] && y === tailPos[1];
        });
        return index === foundIndex;
    });
    console.log(uniqueTailPositions.length);
});
