var Grid = (function () {
    function Grid() {
        this.dimensions = 2;
        this.tiles = [];
        this.tileWidth = 1;
        this.tileHeight = 1;
        for (var row = 0; row < this.dimensions; row++) {
            for (var column = 0; column < this.dimensions; column++) {
                this.tiles.push(new Tile(row, column));
            }
        }
    }
    Grid.prototype.setCanvasSize = function (width, height) {
        this.tileWidth = Math.floor(width / this.dimensions);
        this.tileHeight = Math.floor(height / this.dimensions);
    };
    Grid.getInstance = function () {
        if (!Grid.instance) {
            Grid.instance = new Grid();
        }
        return Grid.instance;
    };
    Grid.prototype.draw = function () {
        var _this = this;
        this.tiles.forEach(function (tile) { return tile.draw(_this.tileWidth, _this.tileHeight); });
    };
    return Grid;
}());
var grid;
function preload() {
    TileImages.getInstance();
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
var Tile = (function () {
    function Tile(row, column) {
        this.collapsed = false;
        this.options = [TileType.Blank, TileType.Up, TileType.Right, TileType.Down, TileType.Left];
        this.row = row;
        this.column = column;
        this.images = TileImages.getInstance();
    }
    Tile.prototype.draw = function (width, height) {
        if (!this.collapsed) {
            fill(0);
            rect(this.column * width, this.row * height, width, height);
            return;
        }
        image(this.images.getImage(TileType.Up), this.column * width, this.row * height, width, height);
    };
    return Tile;
}());
//# sourceMappingURL=build.js.map