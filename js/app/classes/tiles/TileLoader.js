define(['Tile', 'GrassTile', 'DirtTile', 'StoneTile'], function (Tile, GrassTile, DirtTile, StoneTile) {

    Tile.grassTile = new GrassTile();
    Tile.dirtTile = new DirtTile();
    Tile.stoneTile = new StoneTile();

    return Tile;
});