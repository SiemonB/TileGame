define(['Class', 'Assets'], function (Class, Assets) {

    var DEFAULT_TILE_WIDTH = 32,
        DEFAULT_TILE_HEIGHT = 32;

    var tiles = [];

    var Tile = Class.extend({
        init: function (_texture, _id) {
            this.texture = _texture;
            this.id = _id;
            tiles[_id] = this;
        },
        tick: function (_dt) {

        },
        render: function (_g) {
            _g.myDrawImage(this.texture, _x, _y, DEFAULT_TILE_WIDTH, DEFAULT_TILE_HEIGHT);
        },
        getId: function () {
            return this.id;
        },
        isSolid: function () {
            return false;
        },
    })

    Tile.tiles = tiles;
    Tile.DEFAULT_TILE_WIDTH = DEFAULT_TILE_WIDTH;
    Tile.DEFAULT_TILE_HEIGHT = DEFAULT_TILE_HEIGHT;
    Tile.assets = Assets.getAssets("tiles");

    console.log("Tile.js");
    console.log(tiles);

    console.log("Assets imp.js");
    console.log(Assets.tiles);

    return Tile;
});