let grid: Grid;

function preload() {
	// create the tile objects
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
	// frameRate(1);

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
	} else {
		// no more cells to collapse
		noLoop();
	}

	background(51);
	grid.draw();
}
