/**
 * Load the simple tile set
 */
function simpleTileSet() {
	const dir = 'tiles/simple/';
	new Tile(dir + 'blank.png', { up: 'a', down: 'a', left: 'a', right: 'a' });
	new Tile(dir + 'up.png', { up: 'b', down: 'a', left: 'b', right: 'b' });
	new Tile(dir + 'right.png', { up: 'b', down: 'b', left: 'a', right: 'b' });
	new Tile(dir + 'down.png', { up: 'a', down: 'b', left: 'b', right: 'b' });
	new Tile(dir + 'left.png', { up: 'b', down: 'b', left: 'b', right: 'a' });
}
