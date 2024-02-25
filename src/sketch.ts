let grid: Grid;
let img: p5.Image;
let tileset: { preload: () => void; setup: () => void };

function preload() {
	// tileset = SimpleTileSet;
	tileset = CircuitTileSet;

	tileset.preload();
}

function setup() {
	console.log('🚀 - Setup initialized - P5 is running');
	createCanvas(800, 800);
	grid = Grid.getInstance();
	grid.setCanvasSize(width, height);

	tileset.setup();
}

function draw() {
	background(10);
	grid.draw();

	const cell = grid.pickCell();
	if (cell) {
		cell.collapse();
		grid.updateOptions();
	} else {
		// no more cells to collapse
		noLoop();
	}
}
