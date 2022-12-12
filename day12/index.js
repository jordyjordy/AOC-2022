import fs from 'fs';
import readline from 'readline';
const file = fs.createReadStream('./day12/input.txt');
const reader = readline.createInterface({
    input: file
});

let start = [0, 0];
let end = [0, 0];

const grid = [];

class Node {
    height;
    edges;
    dist = Number.MAX_SAFE_INTEGER;
    prev;
}

let lineNumber = 0;
reader.on('line', (text) => {
    grid.push([]);
    text.split('').forEach((char, index) => {
        if (char === 'S') {
            start = [index, lineNumber];
        } else if (char === 'E') {
            end = [index, lineNumber];
        }
        const newNode = new Node();
        newNode.height = Math.max(char.charCodeAt(0) - 97, 0);
        if (char === 'E') {
            newNode.height = 25;
        }
        grid[lineNumber].push(newNode);
    });
    lineNumber++;
});

const getEdgeWeights = ([x, y], grid) => {
    const edgeWeights = [];
    const height = grid[y][x].height;
    if (x > 0) {
        if (grid[y][x - 1].height >= height - 1) {
            edgeWeights.push({ weight: 1, node: grid[y][x - 1] });
        }
    }
    if (x < grid[0].length - 1) {
        if (grid[y][x + 1].height >= height - 1) {
            edgeWeights.push({ weight: 1, node: grid[y][x + 1] });
        }
    }
    if (y > 0) {
        if (grid[y - 1][x].height >= height - 1) {
            edgeWeights.push({ weight: 1, node: grid[y - 1][x] });
        }
    }
    if (y < grid.length - 1) {
        if (grid[y + 1][x].height >= height - 1) {
            edgeWeights.push({ weight: 1, node: grid[y + 1][x] });
        }
    }
    return edgeWeights;
};

reader.on('close', () => {
    console.log(start);
    console.log(end);
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            grid[y][x].edges = getEdgeWeights([x, y], grid);
        }
    }
    const queue = [];
    queue.push(grid[end[1]][end[0]]);
    grid[end[1]][end[0]].dist = 0;
    while (queue.length > 0) {
        const currNode = queue.shift();
        currNode.edges.forEach((edge) => {
            if (edge.node.dist > currNode.dist + 1) {
                edge.node.dist = currNode.dist + 1;
                queue.push(edge.node);
            }
        });
    }
    // grid.forEach((row) => console.log(row.map(( { dist }) => dist).join(',')))
    console.log(grid.flat().filter(({ height }) => height === 0).map(({ dist }) => dist).sort((a, b) => a - b));
});
