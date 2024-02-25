class Cell {
	row: number;
	column: number;

	collapsed: boolean = false;
	options: Tile[] = [];

	constructor(row: number, column: number, options: Tile[] = Tile.allTiles()) {
		this.row = row;
		this.column = column;
		this.options = options;
	}

	get tile(): Tile | null {
		if (!this.collapsed) return null;
		return this.options[0];
	}

	/**
	 * Draw this cell
	 * @returns
	 */
	draw(width: number, height: number) {
		if (!this.collapsed) {
			// draw nothing
			fill(0);
			stroke(255);
			rect(this.column * width, this.row * height, width, height);
			return;
		}

		// when the cell is collapsed, there will be only one option
		const tile = this.options[0];
		image(tile.image, this.column * width, this.row * height, width, height);
	}

	/**
	 * Mark the cell as collapsed and pick a random option
	 */
	collapse(): void {
		this.collapsed = true;
		this.options = [random(this.options)];
	}
}
