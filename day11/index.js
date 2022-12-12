import fs from 'fs';
import readline from 'readline';
const file = fs.createReadStream('./day11/input.txt');
const reader = readline.createInterface({
    input: file
});

const getStartingItems = (string) => {
    const [, numbers] = string.split(':');
    const items = numbers.trim().split(', ');
    return items.map((item) => parseInt(item));
};

const getOperation = (string) => {
    const [, operation] = string.split('=');
    const [, action, multiplier] = operation.trim().split(' ');
    const variable = isNaN(parseInt(multiplier))
        ? multiplier
        : parseInt(multiplier);
    return { action, variable };
};

const getLastNumber = (string) => {
    const stringArray = string.split(' ');
    return stringArray[stringArray.length - 1];
};

const getOperationVariable = (oldValue, operation) => {
    return operation.variable === 'old'
        ? oldValue
        : operation.variable;
};

const performOperation = (oldValue, operation) => {
    const variable = getOperationVariable(oldValue, operation);
    switch (operation.action) {
    case '*':
        return oldValue * variable;
    case '+':
        return oldValue + variable;
    }
};

const monkeyDefRegex = /Monkey\s[0-9]+:/;
const startingItemsRegex = /Starting items:/;
const operationRegex = /Operation:/;
const testRegex = /Test:/;
const trueTestRegex = /If\strue/;
const falseTestRegex = /If\sfalse/;

const monkeys = [];

reader.on('line', (text) => {
    if (monkeyDefRegex.test(text)) {
        monkeys.push({});
    } else if (startingItemsRegex.test(text)) {
        monkeys[monkeys.length - 1].items = getStartingItems(text);
    } else if (operationRegex.test(text)) {
        monkeys[monkeys.length - 1].operation = getOperation(text);
    } else if (testRegex.test(text)) {
        monkeys[monkeys.length - 1].testDivisor = parseInt(getLastNumber(text));
    } else if (trueTestRegex.test(text)) {
        monkeys[monkeys.length - 1].trueTest = parseInt(getLastNumber(text));
    } else if (falseTestRegex.test(text)) {
        monkeys[monkeys.length - 1].falseTest = parseInt(getLastNumber(text));
    }
});
const totalRounds = 10000;

reader.on('close', () => {
    const combinedMod = monkeys.map(({ testDivisor }) => testDivisor).reduce((mul, val) => mul * val, 1);
    console.log(combinedMod);
    const editableMonkeys = monkeys.map((monkey) => ({ ...monkey, inspectedItems: 0 }));
    for (let i = 0; i < totalRounds; i++) {
        editableMonkeys.forEach((monkey, index) => {
            monkey.items.forEach(item => {
                const worryLevel = performOperation(item, monkey.operation) % combinedMod;
                if (worryLevel % monkey.testDivisor === 0) {
                    editableMonkeys[monkey.trueTest].items.push(worryLevel);
                } else {
                    editableMonkeys[monkey.falseTest].items.push(worryLevel);
                }
            });
            monkey.inspectedItems += monkey.items.length;
            monkey.items = [];
        });
        if (i % 50 === 0) {
            console.log(i);
        }
    }
    const inspections = editableMonkeys.map(({ inspectedItems }) => inspectedItems);
    inspections.sort((a, b) => b - a);
});
