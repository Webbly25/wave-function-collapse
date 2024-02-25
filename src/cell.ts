class Cell {
	row: number;
	column: number;

	collapsed: boolean = false;
	options: TileType[] = [TileType.Blank, TileType.Up, TileType.Right, TileType.Down, TileType.Left];

	readonly images: TileImages;

	constructor(row: number, column: number) {
		this.row = row;
		this.column = column;

		this.images = TileImages.getInstance();
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
		const option = this.options[0];
		image(this.images.getImage(option), this.column * width, this.row * height, width, height);
	}

	/**
	 * Mark the cell as collapsed and pick a random option
	 */
	collapse(): void {
		this.collapsed = true;
		this.options = [random(this.options)];
	}
}
