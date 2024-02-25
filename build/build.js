"use strict";
class Cell {
    row;
    column;
    collapsed = false;
    options = [];
    constructor(row, column, options = Tile.allTiles()) {
        this.row = row;
        this.column = column;
        this.options = options;
    }
    get tile() {
        if (!this.collapsed)
            return null;
        return this.options[0];
    }
    draw(width, height) {
        if (!this.collapsed)
            return;
        const tile = this.options[0];
        image(tile.image, this.column * width, this.row * height, width, height);
    }
    highlight(width, height) {
        fill(255, 0, 0);
        noStroke();
        rect(this.column * width, this.row * height, width, height);
    }
    collapse() {
        this.collapsed = true;
        this.options = [random(this.options)];
    }
}
class Grid {
    static instance;
    dimensions = 20;
    cells = [];
    cellWidth = 1;
    cellHeight = 1;
    static getInstance() {
        if (!Grid.instance) {
            Grid.instance = new Grid();
        }
        return Grid.instance;
    }
    constructor() {
        for (let row = 0; row < this.dimensions; row++) {
            for (let column = 0; column < this.dimensions; column++) {
                this.cells.push(new Cell(row, column));
            }
        }
    }
    setCanvasSize(width, height) {
        this.cellWidth = Math.floor(width / this.dimensions);
        this.cellHeight = Math.floor(height / this.dimensions);
    }
    draw() {
        this.cells.forEach(cell => cell.draw(this.cellWidth, this.cellHeight));
    }
    pickCell() {
        let currentEntropy = null;
        let possibleCells = [];
        this.cells.forEach(cell => {
            if (cell.collapsed)
                return;
            if (currentEntropy === null || cell.options.length < currentEntropy) {
                currentEntropy = cell.options.length;
                possibleCells = [cell];
                return;
            }
            if (cell.options.length === currentEntropy) {
                possibleCells.push(cell);
                return;
            }
        });
        if (possibleCells.length === 0) {
            return null;
        }
        return random(possibleCells);
    }
    getCell(row, column) {
        if (row < 0 || row > this.dimensions - 1)
            return null;
        if (column < 0 || column > this.dimensions - 1)
            return null;
        return this.cells[column + row * this.dimensions];
    }
    updateOptions() {
        const nextGrid = this.cells.map(cell => {
            if (cell.collapsed)
                return cell;
            let options = Tile.allTiles();
            const checkConnections = (direction) => {
                const neighbour = this.getNeighbour(cell, direction);
                if (!neighbour)
                    return;
                const connections = neighbour.options.map(tile => tile.connection[this.oppositeDirection(direction)]);
                options = options.filter(tile => connections.includes(tile.connection[direction]));
            };
            checkConnections('up');
            checkConnections('down');
            checkConnections('left');
            checkConnections('right');
            if (options.length === 0) {
                cell.highlight(this.cellWidth, this.cellHeight);
                noLoop();
            }
            return new Cell(cell.row, cell.column, options);
        });
        this.cells = nextGrid;
    }
    getNeighbour(cell, direction) {
        switch (direction) {
            case 'up':
                return this.getCell(cell.row - 1, cell.column);
            case 'down':
                return this.getCell(cell.row + 1, cell.column);
            case 'left':
                return this.getCell(cell.row, cell.column - 1);
            case 'right':
                return this.getCell(cell.row, cell.column + 1);
        }
    }
    oppositeDirection(direction) {
        switch (direction) {
            case 'up':
                return 'down';
            case 'down':
                return 'up';
            case 'left':
                return 'right';
            case 'right':
                return 'left';
        }
    }
}
let grid;
function preload() {
    new Tile('tiles/blank.png', { up: 'a', down: 'a', left: 'a', right: 'a' });
    new Tile('tiles/up.png', { up: 'b', down: 'a', left: 'b', right: 'b' });
    new Tile('tiles/right.png', { up: 'b', down: 'b', left: 'a', right: 'b' });
    new Tile('tiles/down.png', { up: 'a', down: 'b', left: 'b', right: 'b' });
    new Tile('tiles/left.png', { up: 'b', down: 'b', left: 'b', right: 'a' });
}
function setup() {
    console.log('🚀 - Setup initialized - P5 is running');
    createCanvas(400, 400);
    grid = Grid.getInstance();
    grid.setCanvasSize(width, height);
}
function draw() {
    background(51);
    grid.draw();
    const cell = grid.pickCell();
    if (cell) {
        cell.collapse();
        grid.updateOptions();
    }
    else {
        noLoop();
    }
}
class Tile {
    static Tiles = [];
    static allTiles() {
        return Object.values(Tile.Tiles);
    }
    image;
    connection;
    constructor(imagePath, connection) {
        this.image = loadImage(imagePath);
        this.connection = connection;
        Tile.Tiles.push(this);
    }
}
//# sourceMappingURL=build.js.map