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
        if (!this.collapsed) {
            fill(0);
            stroke(255);
            rect(this.column * width, this.row * height, width, height);
            return;
        }
        const tile = this.options[0];
        image(tile.image, this.column * width, this.row * height, width, height);
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
                const neighbour = this.getneighbour(cell, direction);
                if (!neighbour)
                    return;
                const connections = neighbour.options.map(tile => tile.connection[this.oppositeDirection(direction)]);
                options = options.filter(tile => connections.includes(tile.connection[direction]));
            };
            checkConnections('up');
            checkConnections('down');
            checkConnections('left');
            checkConnections('right');
            return new Cell(cell.row, cell.column, options);
        });
        this.cells = nextGrid;
    }
    getneighbour(cell, direction) {
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
    new Tile(TileType.Blank, 'tiles/blank.png', {
        up: 'a',
        down: 'a',
        left: 'a',
        right: 'a'
    });
    new Tile(TileType.Up, 'tiles/up.png', {
        up: 'b',
        down: 'a',
        left: 'b',
        right: 'b'
    });
    new Tile(TileType.Right, 'tiles/right.png', {
        up: 'b',
        down: 'b',
        left: 'a',
        right: 'b'
    });
    new Tile(TileType.Down, 'tiles/down.png', {
        up: 'a',
        down: 'b',
        left: 'b',
        right: 'b'
    });
    new Tile(TileType.Left, 'tiles/left.png', {
        up: 'b',
        down: 'b',
        left: 'b',
        right: 'a'
    });
}
function setup() {
    console.log('🚀 - Setup initialized - P5 is running');
    createCanvas(400, 400);
    grid = Grid.getInstance();
    grid.setCanvasSize(width, height);
}
function draw() {
    const cell = grid.pickCell();
    if (cell) {
        cell.collapse();
        grid.updateOptions();
    }
    else {
        noLoop();
    }
    background(51);
    grid.draw();
}
var TileType;
(function (TileType) {
    TileType[TileType["Blank"] = 0] = "Blank";
    TileType[TileType["Up"] = 1] = "Up";
    TileType[TileType["Right"] = 2] = "Right";
    TileType[TileType["Down"] = 3] = "Down";
    TileType[TileType["Left"] = 4] = "Left";
})(TileType || (TileType = {}));
class Tile {
    static Tiles = {};
    static getTile(tileType) {
        const tile = Tile.Tiles[tileType];
        if (tile)
            return tile;
        throw new Error(`Tile not found: ${tileType}`);
    }
    static allTiles() {
        return Object.values(Tile.Tiles);
    }
    type;
    image;
    connection;
    constructor(type, imagePath, connection) {
        this.type = type;
        this.image = loadImage(imagePath);
        this.connection = connection;
        Tile.Tiles[type] = this;
    }
}
//# sourceMappingURL=build.js.map