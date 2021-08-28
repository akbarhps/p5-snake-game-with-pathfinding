function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.parent = null;
    this.isVisited = false;
    this.isBody = false;

    this.findNeighbors = () => {
        let neighbors = [];
        let current;
        if (y < gridRow - 1) {
            current = grid[y + 1][x];
            if (!current.isVisited && !current.isBody) {
                current.isVisited = true;
                current.parent = this;
                neighbors.push(current);
            }
        }
        if (y > 0) {
            current = grid[y - 1][x];
            if (!current.isVisited && !current.isBody) {
                current.isVisited = true;
                current.parent = this;
                neighbors.push(current);
            }
        }
        if (x < gridColumn - 1) {
            current = grid[y][x + 1];
            if (!current.isVisited && !current.isBody) {
                current.isVisited = true;
                current.parent = this;
                neighbors.push(current);
            }
        }
        if (x > 0) {
            current = grid[y][x - 1];
            if (!current.isVisited && !current.isBody) {
                current.isVisited = true;
                current.parent = this;
                neighbors.push(current);
            }
        }
        return neighbors;
    }

    this.draw = (type) => {
        strokeWeight(1);
        stroke(255);
        if (type === 'food') {
            fill(0, 255, 0);
        } else if (type === 'body') {
            fill(255, 0, 0);
        } else {
            fill(0);
        }
        rect(this.y * cellSize, this.x * cellSize, cellSize, cellSize);
    };
}