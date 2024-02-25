class Grid {
	private static instance: Grid;

	readonly dimensions: number = 2;
	readonly cells: Cell[] = [];

	private cellWidth: number = 1;
	private cellHeight: number = 1;

	static getInstance(): Grid {
		if (!Grid.instance) {
			Grid.instance = new Grid();
		}
		return Grid.instance;
	}

	private constructor() {
		// create all the cells
		for (let row = 0; row < this.dimensions; row++) {
			for (let column = 0; column < this.dimensions; column++) {
				this.cells.push(new Cell(row, column));
			}
		}
	}

	/**
	 * Set the size of the canvas
	 * @param width The canvas width
	 * @param height The canvas height
	 */
	setCanvasSize(width: number, height: number): void {
		this.cellWidth = Math.floor(width / this.dimensions);
		this.cellHeight = Math.floor(height / this.dimensions);
	}

	/**
	 * Draw the grid
	 */
	draw(): void {
		this.cells.forEach(cell => cell.draw(this.cellWidth, this.cellHeight));
	}

	/**
	 * Pick a cell with the least entropy to collapse
	 * @returns The cell to collapse, or null if there are no possible cell
	 */
	pickCell(): Cell | null {
		let currentEntropy: number | null = null;
		let possibleCells: Cell[] = [];

		this.cells.forEach(cell => {
			// ignore collapsed cell
			if (cell.collapsed) return;

			if (currentEntropy === null || cell.options.length < currentEntropy) {
				// first tile, or tile with less entropy
				currentEntropy = cell.options.length;
				possibleCells = [cell];
				return;
			}

			if (cell.options.length === currentEntropy) {
				// tile with same entropy
				possibleCells.push(cell);
				return;
			}
		});

		if (possibleCells.length === 0) {
			// no possible cells
			return null;
		}

		return random(possibleCells);
	}
}
