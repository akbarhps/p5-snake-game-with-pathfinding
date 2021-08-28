let canvasSize;
let cellSize;

let grid = [];
let gridRow = 20;
let gridColumn = 20;

let foodCell;
let snakeBody = [];
let bfsMoves = [];

function setup() {
    frameRate(10);
    canvasSize = min(windowHeight, windowWidth);
    canvasSize -= (canvasSize * 0.1);
    createCanvas(canvasSize, canvasSize).parent('view');
    cellSize = Math.floor(canvasSize / gridRow);

    select("#openGithub").mousePressed(() => {
        window.open('https://www.github.com/akbarhps', '_blank');
    });

    resetProgress();
    frameRateListener();
}

function draw() {
    foodCell.draw('food');
    // if (bfsMoves.length === 0) {
    //     bfs();
    // } else {
    //     updateSnake();
    // }
}

function bfs() {
    let snakeHead = snakeBody[0];
    let currentSet = [snakeHead];

    while (true) {
        let nextSet = [];
        for (let cell of currentSet) {
            nextSet.push(...cell.findNeighbors());
        }

        if (nextSet.length === 0) {
            resetProgress();
            return;
        }

        currentSet = nextSet;
        for (let cell of currentSet) {
            if (cell === foodCell) {
                retracePath(cell);
                return;
            }
        }
    }
}

function retracePath(cell) {
    bfsMoves = [];
    bfsMoves.push(cell);

    const head = snakeBody[0];
    let lastCell = cell.parent;
    while (lastCell != null && lastCell !== head) {
        lastCell.draw('path');
        bfsMoves.push(lastCell);
        lastCell = lastCell.parent;
    }

    bfsMoves.reverse();
    resetGridVisited();
}

function resetGridVisited() {
    for (let col of grid) {
        for (let cell of col) {
            cell.isVisited = false;
            cell.parent = null;
        }
    }
}

function updateSnake() {
    const tail = snakeBody[snakeBody.length - 1];
    const head = bfsMoves[0];

    bfsMoves.shift();
    snakeBody.unshift(head);
    head.isBody = true;

    if (head === foodCell) {
        generateFood();
    } else {
        tail.draw();
        tail.isBody = false;
        snakeBody.pop();
    }

    head.draw('body');
}

function generateFood() {
    let randX = -1, randY = -1;
    while (randX < 0 || randY < 0 || grid[randY][randX].isBody) {
        randY = Math.floor(random(0, gridRow));
        randX = Math.floor(random(0, gridColumn));
    }
    foodCell = grid[randY][randX];
}

function frameRateListener() {
    let sizeInput = document.getElementById('frameRate');
    sizeInput.addEventListener('input', (event) => {
        let value = Number(event.target.value);
        if (value < 10) {
            value = 10;
        } else if (value > 60) {
            value = 60;
        }
        frameRate(value);
    });
}

function resetProgress() {
    grid = [];
    for (let y = 0; y < gridRow; y++) {
        let cols = [];
        for (let x = 0; x < gridColumn; x++) {
            const cell = new Cell(x, y);
            cols.push(cell);
            cell.draw();
        }
        grid.push(cols);
    }

    bfsMoves = [];
    foodCell = grid[Math.floor(random(gridRow))][Math.floor(random(gridColumn))];
    snakeBody = [grid[Math.floor(random(gridRow))][Math.floor(random(gridColumn))]];
    snakeBody[0].isBody = true;
}