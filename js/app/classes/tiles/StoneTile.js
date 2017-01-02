define(['Tile'], function (Tile) {

    var StoneTile = Tile.extend({
        init: function (_id) {
            this._super(Tile.assets.stone, _id);
        },
        isSolid: function () {
            return false;
        }

    });

    return StoneTile;
});
