let canvasSize;
let cellSize;

let mode = "bfs";

let grid = [];
let gridRow = 20;
let gridColumn = 20;

let foodCell;
let snakeBody = [];
let snakeMoves = [];
let found = false;

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
    if (snakeMoves.length == 0) {
        findPath();
    } else {
        updateSnake();
    }
    if (found) toggleDialog(false);
    else if (snakeMoves.length == 0) {
        if (keyIsDown(37)) {
            addSnakeMoves(0, -1);
        } else if (keyIsDown(38)) {
            addSnakeMoves(-1, 0);
        } else if (keyIsDown(39)) {
            addSnakeMoves(0, 1);
        } else if (keyIsDown(40)) {
            addSnakeMoves(1, 0);
        }
    }
}

function findPath() {
    switch (mode) {
        case "bfs":
            bfs()
            break;
        case "dfs":
            dfs();
            break;
        case "astar":
            astar();
            break;
    }
}

function addSnakeMoves(x, y) {
    let head = snakeBody[0];
    let current = { x: head.x + x, y: head.y + y };

    let outOfGrid = current.y < 0 || current.y >= gridRow || current.x < 0 || current.x >= gridColumn;
    if (!outOfGrid && !snakeBody.includes(grid[current.y][current.x])) {
        snakeMoves.push(grid[current.y][current.x]);
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
    snakeBody[0].draw('body');
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

    head.draw('head');
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

function toggleDialog(show) {
    if (show) select('#dialog').addClass('visible');
    else select('#dialog').removeAttribute('class');
}