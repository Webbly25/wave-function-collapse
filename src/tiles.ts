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
	 * @param rotations How many times the tile should be rotated
	 */
	constructor(image: p5.Image | p5.Graphics, connections: Connections, rotations: 0 | 2 | 4 = 0) {
		this.image = image;
		this.connections = connections;

		Tile.Tiles.push(this);

		if (rotations === 0) return;
		if (rotations === 2) {
			this.rotate(1);
			return;
		}
		if (rotations === 4) {
			this.rotate(1);
			this.rotate(2);
			this.rotate(3);
			return;
		}
	}

	/**
	 * Rotate the tile HALF_PI clockwise
	 * Then add the rotated tile to the list of tiles
	 */
	private rotate(count: number): Tile {
		// rotate the image
		const width = this.image.width;
		const height = this.image.height;
		const newImg = createGraphics(width, height);
		newImg.imageMode(CENTER);
		newImg.translate(width / 2, height / 2);
		newImg.rotate(HALF_PI * count);
		newImg.image(this.image, 0, 0);

		// rotate the connection rules
		const oldConnections: string[] = [
			this.connections.up,
			this.connections.right,
			this.connections.down,
			this.connections.left
		];
		const newConnection: Connections = {
			up: oldConnections[(0 - count + 4) % 4],
			right: oldConnections[(1 - count + 4) % 4],
			down: oldConnections[(2 - count + 4) % 4],
			left: oldConnections[(3 - count + 4) % 4]
		};
		// const newConnection: Connections = {
		// 	up: this.connections.left,
		// 	right: this.connections.up,
		// 	down: this.connections.right,
		// 	left: this.connections.down
		// };

		return new Tile(newImg, newConnection);
	}
}
