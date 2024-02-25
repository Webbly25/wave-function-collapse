class Tile {
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
	 * Draw this tile
	 * @returns
	 */
	draw(width: number, height: number) {
		if (!this.collapsed) {
			// draw nothing
			fill(0);
			rect(this.column * width, this.row * height, width, height);
			return;
		}

		image(this.images.getImage(TileType.Up), this.column * width, this.row * height, width, height);
	}
}
