let found = false;

function dfs() {
    found = false;
    visitNeighbors(snakeBody[0]);
    if(!found) noLoop();
}

function visitNeighbors(cell) {
    if (found) return;

    if (cell === foodCell) {
        retracePath(cell);
        found = true;
        return;
    }

    for (let neighbor of cell.findNeighbors()) {
        neighbor.parent = cell;
        visitNeighbors(neighbor);
    }
}