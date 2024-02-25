type Direction = 'up' | 'down' | 'left' | 'right';
type Connection = Record<Direction, string>;

enum TileType {
	Blank,
	Up,
	Right,
	Down,
	Left,
}

class Tile {
	static Tiles: Partial<Record<TileType, Tile>> = {};

	/**
	 * Get a tile by its type
	 * @param tileType The type of the tile
	 * @returns The tile
	 */
	static getTile(tileType: TileType): Tile {
		const tile = Tile.Tiles[tileType];
		if (tile) return tile;

		throw new Error(`Tile not found: ${tileType}`);
	}

	/**
	 * Get all the tiles
	 * @returns All the tiles
	 */
	static allTiles(): Tile[] {
		return Object.values(Tile.Tiles) as Tile[];
	}

	readonly type: TileType;
	readonly image: p5.Image;
	readonly connection: Connection;

	/**
	 * Create a new tile
	 * @param type The type of tile it is
	 * @param imagePath The path to the image
	 * @param connection The connection rules for the tile
	 */
	constructor(type: TileType, imagePath: string, connection: Connection) {
		this.type = type;
		this.image = loadImage(imagePath);
		this.connection = connection;

		Tile.Tiles[type] = this;
	}
}
