define(['Tile', 'GrassTile', 'DirtTile', 'StoneTile'], function (Tile, GrassTile, DirtTile, StoneTile) {

    Tile.stoneTile = new StoneTile(1);
    Tile.grassTile = new GrassTile(0);
    Tile.dirtTile = new DirtTile(2);


    return Tile;
});
