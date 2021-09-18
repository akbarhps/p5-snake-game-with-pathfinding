function bfs() {
    let currentSet = [snakeBody[0]];
    resetGridVisited();

    while (true) {
        let nextSet = [];
        for (let cell of currentSet) {
            nextSet.push(...cell.findNeighbors());
        }

        if (nextSet.length === 0) {
            if (!found) toggleDialog(true);
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