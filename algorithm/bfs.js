function bfs() {
    let currentSet = [snakeBody[0]];

    while (true) {
        let nextSet = [];
        for (let cell of currentSet) {
            nextSet.push(...cell.findNeighbors());
        }

        if (nextSet.length === 0) {
            noLoop();
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