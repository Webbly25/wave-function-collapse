type Direction = 'up' | 'down' | 'left' | 'right';
type Connection = Record<Direction, string>;

class Tile {
	static Tiles: Tile[] = [];

	/**
	 * Get all the tiles
	 * @returns All the tiles
	 */
	static allTiles(): Tile[] {
		return Object.values(Tile.Tiles) as Tile[];
	}

	readonly image: p5.Image;
	readonly connection: Connection;

	/**
	 * Create a new tile
	 * @param type The type of tile it is
	 * @param imagePath The path to the image
	 * @param connection The connection rules for the tile
	 */
	constructor(imagePath: string, connection: Connection) {
		this.image = loadImage(imagePath);
		this.connection = connection;

		Tile.Tiles.push(this);
	}
}
