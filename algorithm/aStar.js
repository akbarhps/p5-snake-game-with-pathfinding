let openSet = [];
let closedSet = [];
let currentCell = undefined;

function AStar() {
    found = false;
    openSet = [snakeBody[0]];
    closedSet = [];
    currentCell = undefined;

    while (openSet.length > 0) {
        if(found) break;
        find();
    }

    if (found) retracePath(currentCell);
    else noLoop();
}

function find() {
    if (openSet.length === 0) return;
    if (currentCell === foodCell) {
        found = true;
        return;
    }

    currentCell = findLowestMoveCost();
    removeElementFromArray(openSet, currentCell);
    closedSet.push(currentCell);

    for (let neighbor of currentCell.findNeighbors()) {
        if (closedSet.includes(neighbor)) continue;

        let moveCostToNeighbor = currentCell.gCost + currentCell.calculateDistance(neighbor);
        if (moveCostToNeighbor >= neighbor.gCost && openSet.includes(neighbor)) continue;

        neighbor.gCost = moveCostToNeighbor;
        neighbor.hCost = neighbor.calculateDistance(foodCell);
        neighbor.parent = currentCell;

        if (openSet.includes(neighbor)) continue;
        openSet.push(neighbor);
    }
}

function findLowestMoveCost() {
    let lowest = openSet[0];
    for (let i = 1; i < openSet.length; i++) {
        let current = openSet[i];
        if (current.fCost() < lowest.fCost()) lowest = current;
        else if (current.fCost() === lowest.fCost() && current.hCost < lowest.hCost) lowest = current;
    }
    return lowest;
}

function removeElementFromArray(array, element) {
    array.splice(array.indexOf(element), 1);
}
