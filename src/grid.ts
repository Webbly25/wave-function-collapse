class Grid {
	private static instance: Grid;

	readonly dimensions: number = 2;
	readonly tiles: Tile[] = [];

	private tileWidth: number = 1;
	private tileHeight: number = 1;

	static getInstance(): Grid {
		if (!Grid.instance) {
			Grid.instance = new Grid();
		}
		return Grid.instance;
	}

	private constructor() {
		// create all the tiles
		for (let row = 0; row < this.dimensions; row++) {
			for (let column = 0; column < this.dimensions; column++) {
				this.tiles.push(new Tile(row, column));
			}
		}
	}

	/**
	 * Set the size of the canvas
	 * @param width The canvas width
	 * @param height The canvas height
	 */
	setCanvasSize(width: number, height: number): void {
		this.tileWidth = Math.floor(width / this.dimensions);
		this.tileHeight = Math.floor(height / this.dimensions);
	}

	/**
	 * Draw the grid
	 */
	draw(): void {
		this.tiles.forEach(tile => tile.draw(this.tileWidth, this.tileHeight));
	}

	/**
	 * Pick a tile with the least entropy to collapse
	 * @returns The tile to collapse, or null if there are no possible tiles
	 */
	pickTile(): Tile | null {
		let currentEntropy: number | null = null;
		let possibleTiles: Tile[] = [];

		this.tiles.forEach(tile => {
			// ignore collapsed tiles
			if (tile.collapsed) return;

			if (currentEntropy === null || tile.options.length < currentEntropy) {
				// first tile, or tile with less entropy
				currentEntropy = tile.options.length;
				possibleTiles = [tile];
				return;
			}

			if (tile.options.length === currentEntropy) {
				// tile with same entropy
				possibleTiles.push(tile);
				return;
			}
		});

		if (possibleTiles.length === 0) {
			// no possible tiles
			return null;
		}

		return random(possibleTiles);
	}
}
