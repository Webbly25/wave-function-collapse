let grid: Grid;

function preload() {
	// ensure the images are loaded
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

	const cell = grid.pickCell();
	if (cell) cell.collapse();

	grid.draw();

	noLoop();
}
