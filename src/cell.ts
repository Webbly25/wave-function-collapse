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
	 * Draw the cell
	 * @param width The width of the cell
	 * @param height The height of the cell
	 */
	draw(width: number, height: number): void {
		if (!this.collapsed) return;

		// when the cell is collapsed, there will be only one option
		const tile = this.options[0];
		image(tile.image, this.column * width, this.row * height, width, height);
	}

	/**
	 * Highlight the cell
	 * @param width The width of the cell
	 * @param height The height of the cell
	 */
	highlight(width: number, height: number): void {
		fill(255, 0, 0);
		noStroke();
		rect(this.column * width, this.row * height, width, height);
	}

	/**
	 * Mark the cell as collapsed and pick a random option
	 */
	collapse(): void {
		this.collapsed = true;
		this.options = [random(this.options)];
	}
}
