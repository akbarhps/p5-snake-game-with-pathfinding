let canvasSize;
let cellSize;

let mode = "bfs";

let grid = [];
let gridRow = 20;
let gridColumn = 20;

let foodCell;
let snakeBody = [];
let snakeMoves = [];

function setup() {
    frameRate(10);
    canvasSize = min(windowHeight, windowWidth);
    canvasSize -= (canvasSize * 0.1);
    createCanvas(canvasSize, canvasSize).parent('view');
    cellSize = Math.floor(canvasSize / gridRow);

    setupUI();
    resetProgress();
}

function draw() {
    foodCell.draw('food');
    if (snakeMoves.length === 0) {
        switch (mode) {
            case "bfs":
                bfs()
                break;
            case "dfs":
                dfs();
                break;
        }
    } else {
        updateSnake();
    }
}

function retracePath(cell) {
    snakeMoves = [];
    snakeMoves.push(cell);

    const head = snakeBody[0];
    let lastCell = cell.parent;
    while (lastCell != null && lastCell !== head) {
        lastCell.draw('path');
        snakeMoves.push(lastCell);
        lastCell = lastCell.parent;
    }

    snakeMoves.reverse();
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
    const head = snakeMoves[0];

    snakeMoves.shift();
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

function resetProgress() {
    grid = [];
    for (let y = 0; y < gridRow; y++) {
        let cols = [];
        for (let x = 0; x < gridColumn; x++) {
            const cell = new Cell(x, y);
            cell.draw();
            cols.push(cell);
        }
        grid.push(cols);
    }

    snakeMoves = [];
    foodCell = grid[Math.floor(random(gridRow))][Math.floor(random(gridColumn))];
    snakeBody = [grid[Math.floor(random(gridRow))][Math.floor(random(gridColumn))]];
    snakeBody[0].isBody = true;
    loop();
}

function setupUI() {
    document.getElementById('frameRate').addEventListener('input', (event) => {
        let value = Number(event.target.value);
        if (value < 10) value = 10;
        else if (value > 60) value = 60;
        frameRate(value);
    });

    document.getElementById('mode').addEventListener('input', (event) => {
        mode = event.target.value;
    });

    select("#reset").mousePressed(resetProgress);
    select("#openGithub").mousePressed(() => window.open('https://www.github.com/akbarhps', '_blank'));
}