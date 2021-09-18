function dfs() {
    found = false;
    visitNeighbors(snakeBody[0]);
    resetGridVisited();

    if (!found) toggleDialog(true);
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