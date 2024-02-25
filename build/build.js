"use strict";
class Cell {
    row;
    column;
    collapsed = false;
    options = [];
    constructor(row, column, options = Tile.Tiles) {
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
        this.reset();
    }
    reset() {
        this.cells = [];
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
        const nextGrid = [];
        for (const cell of this.cells) {
            if (cell.collapsed) {
                nextGrid.push(cell);
                continue;
            }
            let options = Tile.Tiles;
            const checkConnections = (direction) => {
                const neighbour = this.getNeighbour(cell, direction);
                if (!neighbour)
                    return;
                const connections = neighbour.options.map(tile => tile.connections[this.oppositeDirection(direction)]);
                options = options.filter(tile => connections.includes(tile.connections[direction]));
            };
            checkConnections('up');
            checkConnections('down');
            checkConnections('left');
            checkConnections('right');
            if (options.length === 0) {
                if (false && confirm('No more options left, the grid is invalid. Do you want to restart?')) {
                    this.reset();
                }
                else {
                    cell.highlight(this.cellWidth, this.cellHeight);
                    noLoop();
                }
                return;
            }
            nextGrid.push(new Cell(cell.row, cell.column, options));
        }
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
let img;
let tileset;
function preload() {
    tileset = SimpleTileSet;
    tileset.preload();
}
function setup() {
    console.log('🚀 - Setup initialized - P5 is running');
    createCanvas(400, 400);
    grid = Grid.getInstance();
    grid.setCanvasSize(width, height);
    tileset.setup();
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
class SimpleTileSet {
    static tiles;
    static preload() {
        const dir = 'tiles/simple/';
        this.tiles = {
            blank: loadImage(dir + 'blank.png'),
            up: loadImage(dir + 'up.png')
        };
    }
    static setup() {
        new Tile(this.tiles.blank, { up: 'a', right: 'a', down: 'a', left: 'a' }, false);
        new Tile(this.tiles.up, { up: 'b', right: 'b', down: 'a', left: 'b' });
    }
}
class Tile {
    static Tiles = [];
    image;
    connections;
    constructor(image, connections, canRotate = true) {
        this.image = image;
        this.connections = connections;
        Tile.Tiles.push(this);
        if (canRotate)
            this.rotate().rotate().rotate();
    }
    rotate() {
        const width = this.image.width;
        const height = this.image.height;
        const newImg = createGraphics(width, height);
        newImg.imageMode(CENTER);
        newImg.translate(width / 2, height / 2);
        newImg.rotate(HALF_PI);
        newImg.image(this.image, 0, 0);
        const newConnection = {
            up: this.connections.left,
            right: this.connections.up,
            down: this.connections.right,
            left: this.connections.down
        };
        return new Tile(newImg, newConnection, false);
    }
}
//# sourceMappingURL=build.js.map