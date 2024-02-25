let grid: Grid;

function preload() {
	// ensure the images are loaded
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
