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
		new Tile(this.tiles.up, { up: 'b', right: 'b', down: 'a', left: 'b' }, 4);
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
		new Tile(this.tiles[0], { up: 'aaa', right: 'aaa', down: 'aaa', left: 'aaa' });
		new Tile(this.tiles[1], { up: 'bbb', right: 'bbb', down: 'bbb', left: 'bbb' });
		new Tile(this.tiles[2], { up: 'bbb', right: 'bcb', down: 'bbb', left: 'bbb' }, 4);
		new Tile(this.tiles[3], { up: 'bbb', right: 'bdb', down: 'bbb', left: 'bdb' }, 4);
		new Tile(this.tiles[4], { up: 'abb', right: 'bcb', down: 'bba', left: 'aaa' }, 4);
		new Tile(this.tiles[5], { up: 'abb', right: 'bbb', down: 'bbb', left: 'bba' }, 4);
		new Tile(this.tiles[6], { up: 'bbb', right: 'bcb', down: 'bbb', left: 'bcb' }, 2);
		new Tile(this.tiles[7], { up: 'bdb', right: 'bcb', down: 'bdb', left: 'bcb' }, 2);
		new Tile(this.tiles[8], { up: 'bdb', right: 'bbb', down: 'bcb', left: 'bbb' }, 4);
		new Tile(this.tiles[9], { up: 'bcb', right: 'bcb', down: 'bbb', left: 'bcb' }, 4);
		new Tile(this.tiles[10], { up: 'bcb', right: 'bcb', down: 'bcb', left: 'bcb' }, 2);
		new Tile(this.tiles[11], { up: 'bcb', right: 'bcb', down: 'bbb', left: 'bbb' }, 4);
		new Tile(this.tiles[12], { up: 'bbb', right: 'bcb', down: 'bbb', left: 'bcb' }, 2);
	}
}
