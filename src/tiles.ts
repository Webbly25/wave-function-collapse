type Direction = 'up' | 'down' | 'left' | 'right';
type Connections = Record<Direction, string>;

class Tile {
	static Tiles: Tile[] = [];

	readonly image: p5.Image | p5.Graphics;
	readonly connections: Connections;

	/**
	 * Create a new tile
	 * @param type The type of tile it is
	 * @param imagePath The path to the image
	 * @param connections The connection rules for the tile
	 * @param canRotate Whether the tile can be rotated
	 */
	constructor(image: p5.Image | p5.Graphics, connections: Connections, canRotate: boolean = true) {
		this.image = image;
		this.connections = connections;

		Tile.Tiles.push(this);

		if (canRotate) this.rotate().rotate().rotate();
	}

	/**
	 * Rotate the tile HALF_PI clockwise
	 * Then add the rotated tile to the list of tiles
	 */
	private rotate(): Tile {
		// rotate the image
		const width = this.image.width;
		const height = this.image.height;
		const newImg = createGraphics(width, height);
		newImg.imageMode(CENTER);
		newImg.translate(width / 2, height / 2);
		newImg.rotate(HALF_PI);
		newImg.image(this.image, 0, 0);

		// rotate the connection rules
		const newConnection: Connections = {
			up: this.connections.left,
			right: this.connections.up,
			down: this.connections.right,
			left: this.connections.down
		};

		return new Tile(newImg, newConnection, false);
	}
}
