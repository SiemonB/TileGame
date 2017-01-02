define(['Class', 'TileLoader', 'Utils'], function (Class, Tile, Utils) {

    var World = Class.extend({

        init: function (_path, _handler) {
            this.tiles = [];
            this.loadWorld(_path);
            this.handler = _handler;
            _handler.setWorld(this);

        },
        loadWorld: function (_path) {

            var tokens = Utils.loadFile();


            this.width = tokens[0];
            this.height = tokens[1];
            this.spawnX = tokens[2] * Tile.DEFAULT_TILE_WIDTH;
            this.spawnY = tokens[3] * Tile.DEFAULT_TILE_HEIGHT;

            for (y = 0; y < this.height; y++) {
                for (x = 0; x < this.width; x++) {
                    if (!this.tiles[x])
                        this.tiles[x] = [];
                    this.tiles[x][y] = parseInt(tokens[(x + (y * this.width)) + 4]);
                }
            }

        },
        tick: function (_dt) {

        },
        render: function (_g) {
            // --- Only render whats on the screen --- //
            var xStart = parseInt(Math.max(0,
                this.handler.getGameCamera().getxOffset() / Tile.DEFAULT_TILE_WIDTH));
            var xEnd = parseInt(Math.min(this.width, (this.handler.getGameCamera().getxOffset() + this.handler.getWidth()) / Tile.DEFAULT_TILE_WIDTH + 1));

            var yStart = parseInt(Math.max(0,
                this.handler.getGameCamera().getyOffset() / Tile.DEFAULT_TILE_HEIGHT));
            var yEnd = parseInt(Math.min(this.height, (this.handler.getGameCamera().getyOffset() + this.handler.getHeight()) / Tile.DEFAULT_TILE_HEIGHT + 1));
            // ---  --- //

            for (y = yStart; y < yEnd; y++) {
                for (x = xStart; x < xEnd; x++) {
                    this.getTile(x, y).render(_g,
                        x * Tile.DEFAULT_TILE_WIDTH - this.handler.getGameCamera().getxOffset(),
                        y * Tile.DEFAULT_TILE_HEIGHT - this.handler.getGameCamera().getyOffset()
                    );

                }
            }


        },
        getTile: function (_x, _y) {
            return Tile.tiles[this.tiles[_x][_y]];
        },
        getHeight: function () {
            return this.height;
        },
        getWidth: function () {
            return this.width;
        }

    })
    return World;
});
