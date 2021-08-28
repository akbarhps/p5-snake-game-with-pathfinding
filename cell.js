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
        fill(0);
        if (type === 'body') {
            fill(255);
            stroke(0);
        } else if (type === 'path') {
            fill(0, 160, 0, 160)
        } else if (type === 'food') {
            fill(255, 255, 0);
        }
        rect(this.y * cellSize, this.x * cellSize, cellSize, cellSize);
    };
}