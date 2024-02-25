class SimpleTileSet {
	static tiles: {
		blank: p5.Image;
		up: p5.Image;
	};

	static preload(): void {
		const dir = 'tiles/simple/';
		this.tiles = {
			blank: loadImage(dir + 'blank.png'),
			up: loadImage(dir + 'up.png')
		};
	}

	static setup(): void {
		new Tile(this.tiles.blank, { up: 'a', right: 'a', down: 'a', left: 'a' });
		new Tile(this.tiles.up, { up: 'b', right: 'b', down: 'a', left: 'b' }, 'FOUR');
	}
}

class CircuitTileSet {
	static tiles: p5.Image[] = [];

	static preload(): void {
		const dir = 'tiles/circuit/';
		for (let i = 0; i < 13; i++) {
			this.tiles.push(loadImage(dir + i + '.png'));
		}
	}

	static setup(): void {
		new Tile(this.tiles[0], { up: 'a', right: 'a', down: 'a', left: 'a' });
		new Tile(this.tiles[1], { up: 'b', right: 'b', down: 'b', left: 'b' });
		new Tile(this.tiles[2], { up: 'b', right: 'c', down: 'b', left: 'b' }, 'FOUR');
		new Tile(this.tiles[3], { up: 'b', right: 'd', down: 'b', left: 'd' }, 'FOUR');
		new Tile(this.tiles[4], { up: 'b', right: 'c', down: 'b', left: 'a' }, 'FOUR');

		// new Tile(this.tiles[5], { up: 'a', right: 'b', down: 'b', left: 'a' }, 4);

		new Tile(this.tiles[6], { up: 'b', right: 'c', down: 'b', left: 'c' }, 'TWO');
		new Tile(this.tiles[7], { up: 'd', right: 'c', down: 'd', left: 'c' }, 'TWO');
		new Tile(this.tiles[8], { up: 'd', right: 'b', down: 'c', left: 'b' }, 'FOUR');
		new Tile(this.tiles[9], { up: 'c', right: 'c', down: 'b', left: 'c' }, 'FOUR');
		new Tile(this.tiles[10], { up: 'c', right: 'c', down: 'c', left: 'c' }, 'FLIP');
		new Tile(this.tiles[11], { up: 'c', right: 'c', down: 'b', left: 'b' }, 'FOUR');
		new Tile(this.tiles[12], { up: 'b', right: 'c', down: 'b', left: 'c' }, 'FOUR');
	}
}
