class Grid {
	private static instance: Grid;

	readonly dimensions: number = 2;
	readonly tiles: Tile[] = [];

	private tileWidth: number = 1;
	private tileHeight: number = 1;

	private constructor() {
		// create all the tiles
		for (let row = 0; row < this.dimensions; row++) {
			for (let column = 0; column < this.dimensions; column++) {
				this.tiles.push(new Tile(row, column));
			}
		}
	}

	setCanvasSize(width: number, height: number): void {
		this.tileWidth = Math.floor(width / this.dimensions);
		this.tileHeight = Math.floor(height / this.dimensions);
	}

	static getInstance(): Grid {
		if (!Grid.instance) {
			Grid.instance = new Grid();
		}
		return Grid.instance;
	}

	draw(): void {
		this.tiles.forEach(tile => tile.draw(this.tileWidth, this.tileHeight));
	}
}
