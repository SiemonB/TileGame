define(['StaticEntity', 'Assets', 'Tile'], function (StaticEntity, Assets, Tile) {
    var assets = Assets.getAssets("tree");

    var Tree = StaticEntity.extend({
        init: function (_handler, _x, _y) {
            this._super(_handler, _x, _y, Tile.DEFAULT_TILE_WIDTH * 5, Tile.DEFAULT_TILE_HEIGHT * 5)
            this.bounds.x = 55;
            this.bounds.y = 135;
            this.bounds.width = 50;
            this.bounds.height = 5;
        },
        tick: function () {

        },
        render: function (_g) {
            _g.myDrawImage(
                assets.redwood,
                this.x - this.handler.getGameCamera().getxOffset(),
                this.y - this.handler.getGameCamera().getyOffset(),
                this.width,
                this.height
            );
            if (_DEBUG_) { //Drawing collision box
                _g.lineWidth = 3;
                _g.strokeRect(
                    this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(),
                    this.bounds.y + this.y - this.handler.getGameCamera().getyOffset(),
                    this.bounds.width,
                    this.bounds.height
                );
                _g.lineWidth = 1;

            };
        }
    });

    return Tree;
});
