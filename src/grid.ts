class Grid {
	private static instance: Grid;

	readonly dimensions: number = 20;
	cells: Cell[] = [];

	private cellWidth: number = 1;
	private cellHeight: number = 1;

	static getInstance(): Grid {
		if (!Grid.instance) {
			Grid.instance = new Grid();
		}
		return Grid.instance;
	}

	private constructor() {
		this.reset();
	}

	/**
	 * Reset the grid
	 */
	private reset(): void {
		this.cells = [];

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

	/**
	 * Get a cell by its row and column
	 * @param row The row of the cell
	 * @param column The column of the cell
	 * @returns The cell, or null if the coordinates are out of bounds
	 */
	getCell(row: number, column: number): Cell | null {
		if (row < 0 || row > this.dimensions - 1) return null;
		if (column < 0 || column > this.dimensions - 1) return null;

		return this.cells[column + row * this.dimensions];
	}

	/**
	 * Update the options available to each cell
	 */
	updateOptions(): void {
		const nextGrid: Cell[] = [];

		for (const cell of this.cells) {
			// keep the collapsed cell as is
			if (cell.collapsed) {
				nextGrid.push(cell);
				continue;
			}

			let options = Tile.Tiles;

			const checkConnections = (direction: Direction) => {
				// get the neighbour cell
				const neighbour = this.getNeighbour(cell, direction);
				if (!neighbour) return;

				// get all the possible connections the neighbour can have
				const connections = neighbour.options.map(tile => tile.connections[this.oppositeDirection(direction)]);
				// filter the options to keep only the ones that have a connection with the neighbour
				options = options.filter(tile => connections.includes(tile.connections[direction]));
			};

			checkConnections('up');
			checkConnections('down');
			checkConnections('left');
			checkConnections('right');

			// if there are no options left, the grid is invalid
			if (options.length === 0) {
				if (false && confirm('No more options left, the grid is invalid. Do you want to restart?')) {
					this.reset();
				} else {
					cell.highlight(this.cellWidth, this.cellHeight);
					noLoop();
				}

				return;
			}

			nextGrid.push(new Cell(cell.row, cell.column, options));
		}

		this.cells = nextGrid;
	}

	/**
	 * Get a neighbour cell
	 * @param cell The cell to get the neighbour of
	 * @param direction The direction of the neighbour
	 * @returns The neighbour cell, or null if the neighbour is out of bounds
	 */
	private getNeighbour(cell: Cell, direction: Direction): Cell | null {
		switch (direction) {
			case 'up':
				return this.getCell(cell.row - 1, cell.column);
			case 'down':
				return this.getCell(cell.row + 1, cell.column);
			case 'left':
				return this.getCell(cell.row, cell.column - 1);
			case 'right':
				return this.getCell(cell.row, cell.column + 1);
		}
	}

	/**
	 * Get the opposite direction
	 * @param direction The direction to get the opposite of
	 * @returns The opposite direction
	 */
	private oppositeDirection(direction: Direction): Direction {
		switch (direction) {
			case 'up':
				return 'down';
			case 'down':
				return 'up';
			case 'left':
				return 'right';
			case 'right':
				return 'left';
		}
	}
}
