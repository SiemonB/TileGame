define(['Tile', 'GrassTile', 'DirtTile', 'StoneTile'], function (Tile, GrassTile, DirtTile, StoneTile) {

    Tile.grassTile = new GrassTile(0);
    Tile.stoneTile = new StoneTile(1);
    Tile.dirtTile = new DirtTile(2);


    return Tile;
});
