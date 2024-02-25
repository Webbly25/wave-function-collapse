class TileImages {
	private static instance: TileImages;

	private images: Record<TileType, p5.Image>;

	private constructor() {
		// load the images
		this.images = {
			[TileType.Blank]: loadImage('tiles/blank.png'),
			[TileType.Up]: loadImage('tiles/up.png'),
			[TileType.Right]: loadImage('tiles/right.png'),
			[TileType.Down]: loadImage('tiles/down.png'),
			[TileType.Left]: loadImage('tiles/left.png')
		};
	}

	static getInstance(): TileImages {
		if (!TileImages.instance) {
			TileImages.instance = new TileImages();
		}
		return TileImages.instance;
	}

	getImage(type: TileType): p5.Image {
		return this.images[type];
	}
}
