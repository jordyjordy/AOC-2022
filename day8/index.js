import fs from 'fs';
import readline from 'readline';
const file = fs.createReadStream('./day8/input.txt');
const reader = readline.createInterface({
    input: file
});

const grid = [];

reader.on('line', (text) => {
    grid.push(text.split('').map((t) => parseInt(t)));
});

reader.on('close', () => {
    // const visible = grid.map((row) => row.map(() => 0));
    const scenicScoreGrid = grid.map((row) => row.map(() => 0));
    const width = grid[0].length;
    const height = grid.length;
    for (let x = 1; x < width - 1; x++) {
        for (let y = 1; y < height - 1; y++) {
            let scenicScore = 1;
            const currHeight = grid[y][x];

            // check down
            for (let yOffset = 1; yOffset + y < height; yOffset++) {
                if (grid[y + yOffset][x] >= currHeight || y + yOffset === height - 1) {
                    scenicScore *= yOffset;
                    break;
                }
            }

            // check up
            for (let yOffset = 1; y - yOffset >= 0; yOffset++) {
                if (grid[y - yOffset][x] >= currHeight || y - yOffset === 0) {
                    scenicScore *= yOffset;
                    break;
                }
            }

            // check right
            for (let xOffset = 1; xOffset + x < width; xOffset++) {
                if (grid[y][x + xOffset] >= currHeight || x + xOffset === width - 1) {
                    scenicScore *= xOffset;
                    break;
                }
            }

            // check up
            for (let xOffset = 1; x - xOffset >= 0; xOffset++) {
                if (grid[y][x - xOffset] >= currHeight || x - xOffset === 0) {
                    scenicScore *= xOffset;
                    break;
                }
            }
            scenicScoreGrid[y][x] = scenicScore;
        }
    }
    console.log(Math.max(...scenicScoreGrid.flat()));
    // //check down
    // for(let x = 0; x < width; x++) {
    //     let minheight = -1;
    //     for(let y = 0; y < height; y++) {
    //         if(grid[y][x] > minheight) {
    //             minheight = grid[y][x];
    //             visible [y][x] = true;
    //         }
    //     }
    // }
    // //check up
    // for(let x = 0; x < width; x++) {
    //     let minheight = -1;
    //     for(let y = height -1; y >= 0; y--) {
    //         if(grid[y][x] > minheight) {
    //             minheight = grid[y][x];
    //             visible [y][x] = true;
    //         }
    //     }
    // }
    // //check left
    // for(let y = 0; y < height; y++) {
    //     let minheight = -1;
    //     for(let x = 0; x < width; x++) {
    //         if(grid[y][x] > minheight) {
    //             minheight = grid[y][x];
    //             visible [y][x] = true;
    //         }
    //     }
    // }
    // //check right
    // for(let y = 0; y < height; y++) {
    //     let minheight = -1;
    //     for(let x = width - 1; x >= 0; x--) {
    //         if(grid[y][x] > minheight) {
    //             minheight = grid[y][x];
    //             visible [y][x] = true;
    //         }
    //     }
    // }
    // const visibleCount = visible.reduce(
    //     (outerCount, row) => outerCount + row.reduce((innerCount, t) => t ? innerCount + 1 : innerCount, 0)
    //     , 0
    // );
    // console.log(visibleCount);
});
