let grid: Grid;

function preload() {
	simpleTileSet();
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
	} else {
		// no more cells to collapse
		noLoop();
	}
}
