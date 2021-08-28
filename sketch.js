let canvasSize;

let grid = [];
let gridRow = 20;
let gridColumn = 20;

let cellSize;

let foodCell;
let snakeBody = [];
let bfsMoves = [];

function setupLayout() {
    canvasSize = min(windowHeight, windowWidth);
    createCanvas(canvasSize, canvasSize).parent('view');
    cellSize = Math.floor(canvasSize / gridRow);

    for (let y = 0; y < gridRow; y++) {
        let cols = [];
        for (let x = 0; x < gridColumn; x++) {
            const cell = new Cell(x, y);
            cols.push(cell);
            cell.draw();
        }
        grid.push(cols);
    }

    foodCell = grid[Math.floor(random(gridRow))][Math.floor(random(gridColumn))];
    snakeBody = [grid[Math.floor(random(gridRow))][Math.floor(random(gridColumn))]];
}

function setup() {
    frameRate(15);
    setupLayout();
}

function draw() {
    foodCell.draw('food');
    if (bfsMoves.length === 0) {
        bfs();
    } else {
        updateSnake();
    }
}

function bfs() {
    let snakeHead = snakeBody[0];
    let currentSet = [snakeHead];

    while (true) {
        let nextSet = [];
        for (let cell of currentSet) {
            nextSet.push(...cell.findNeighbors());
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
    const snakeLength = snakeBody.length;
    const tail = snakeBody[snakeLength - 1];
    const head = bfsMoves[0];

    bfsMoves.shift();
    snakeBody.unshift(head);
    if (head === foodCell) {
        generateFood();
    } else {
        tail.draw();
        snakeBody.pop();
    }

    head.draw('body');
}

function generateFood() {
    let randX = Math.floor(random(0, gridColumn));
    let randY = Math.floor(random(0, gridRow));
    foodCell = grid[randY][randX];
}
