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
		new Tile(this.tiles.blank, { up: 'a', right: 'a', down: 'a', left: 'a' }, false);
		new Tile(this.tiles.up, { up: 'b', right: 'b', down: 'a', left: 'b' });
	}
}
