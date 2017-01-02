define(['Tile'], function (Tile) {

    var DirtTile = Tile.extend({
        init: function (_id) {
            this._super(Tile.assets.dirt, _id);
        },
        isSolid: function () {
            return false;
        }
    });

    return DirtTile;
});
