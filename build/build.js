"use strict";
var Cell = (function () {
    function Cell(row, column) {
        this.collapsed = false;
        this.options = [TileType.Blank, TileType.Up, TileType.Right, TileType.Down, TileType.Left];
        this.row = row;
        this.column = column;
        this.images = TileImages.getInstance();
    }
    Cell.prototype.draw = function (width, height) {
        if (!this.collapsed) {
            fill(0);
            stroke(255);
            rect(this.column * width, this.row * height, width, height);
            return;
        }
        var option = this.options[0];
        image(this.images.getImage(option), this.column * width, this.row * height, width, height);
    };
    Cell.prototype.collapse = function () {
        this.collapsed = true;
        this.options = [random(this.options)];
    };
    return Cell;
}());
var Grid = (function () {
    function Grid() {
        this.dimensions = 2;
        this.cells = [];
        this.cellWidth = 1;
        this.cellHeight = 1;
        for (var row = 0; row < this.dimensions; row++) {
            for (var column = 0; column < this.dimensions; column++) {
                this.cells.push(new Cell(row, column));
            }
        }
    }
    Grid.getInstance = function () {
        if (!Grid.instance) {
            Grid.instance = new Grid();
        }
        return Grid.instance;
    };
    Grid.prototype.setCanvasSize = function (width, height) {
        this.cellWidth = Math.floor(width / this.dimensions);
        this.cellHeight = Math.floor(height / this.dimensions);
    };
    Grid.prototype.draw = function () {
        var _this = this;
        this.cells.forEach(function (cell) { return cell.draw(_this.cellWidth, _this.cellHeight); });
    };
    Grid.prototype.pickCell = function () {
        var currentEntropy = null;
        var possibleCells = [];
        this.cells.forEach(function (cell) {
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
    };
    return Grid;
}());
var grid;
function preload() {
    TileImages.getInstance();
}
function setup() {
    frameRate(1);
    console.log('🚀 - Setup initialized - P5 is running');
    createCanvas(400, 400);
    grid = Grid.getInstance();
    grid.setCanvasSize(width, height);
}
function draw() {
    background(51);
    var cell = grid.pickCell();
    if (cell)
        cell.collapse();
    grid.draw();
    noLoop();
}
var TileImages = (function () {
    function TileImages() {
        var _a;
        this.images = (_a = {},
            _a[TileType.Blank] = loadImage('tiles/blank.png'),
            _a[TileType.Up] = loadImage('tiles/up.png'),
            _a[TileType.Right] = loadImage('tiles/right.png'),
            _a[TileType.Down] = loadImage('tiles/down.png'),
            _a[TileType.Left] = loadImage('tiles/left.png'),
            _a);
    }
    TileImages.getInstance = function () {
        if (!TileImages.instance) {
            TileImages.instance = new TileImages();
        }
        return TileImages.instance;
    };
    TileImages.prototype.getImage = function (type) {
        return this.images[type];
    };
    return TileImages;
}());
var TileType;
(function (TileType) {
    TileType[TileType["Blank"] = 0] = "Blank";
    TileType[TileType["Up"] = 1] = "Up";
    TileType[TileType["Right"] = 2] = "Right";
    TileType[TileType["Down"] = 3] = "Down";
    TileType[TileType["Left"] = 4] = "Left";
})(TileType || (TileType = {}));
//# sourceMappingURL=build.js.map