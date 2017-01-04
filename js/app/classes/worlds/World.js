define(['Class', 'TileLoader', 'Utils', 'EntityManager', 'Player', 'Tree', 'SpatialGrid'], function (Class, Tile, Utils, EntityManager, Player, Tree, SpatialGrid) {
    var tree;
    var World = Class.extend({

        init: function (_path, _handler) {
            this.tiles = [];
            this.handler = _handler;
            _handler.setWorld(this);
            this.entityManager = new EntityManager(_handler, new Player(_handler, 100, 100));

            this.loadWorld(_path);
            this.startDrag = {};

            this.spatialGrid = new SpatialGrid(this.width * Tile.DEFAULT_TILE_WIDTH, this.height * Tile.DEFAULT_TILE_HEIGHT, 100);

            this.entityManager.addEntity(new Tree(_handler, 100, 400));
            this.entityManager.addEntity(new Tree(_handler, 200, 500));
            this.entityManager.addEntity(new Tree(_handler, 300, 450));
            this.entityManager.addEntity(new Tree(_handler, 200, 700));

            this.entityManager.getPlayer().setX(this.spawnX);
            this.entityManager.getPlayer().setY(this.spawnY);

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
            this.getMouseInput();
            this.entityManager.tick(_dt);
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

            this.entityManager.render(_g);

        },
        click: function (_btn) { //_btn is undefined?
            if (_btn == "right") {
                var pos = this.handler.getMouseManager().getMousePosition();
                this.startDrag = {
                    x: pos.x + this.handler.getGameCamera().getxOffset(),
                    y: pos.y + this.handler.getGameCamera().getyOffset()
                };
            }
            this.entityManager.click(_btn);
        },

        //Getters
        getTile: function (_x, _y) {
            return Tile.tiles[this.tiles[_x][_y]];
        },
        getHeight: function () {
            return this.height;
        },
        getWidth: function () {
            return this.width;
        },
        getEntityManager: function () {
            return this.entityManager;
        },
        getSpatialGrid: function () {
            return this.spatialGrid;
        },
        getMouseInput() {
            var pos = this.handler.getMouseManager().getMousePosition();

            /*
            console.log("Left Btn: " + this.handler.getMouseManager().left +
                "\nRight Btn: " + this.handler.getMouseManager().right +
                "\nMiddle Btn: " + this.handler.getMouseManager().middle
            );
            */

            if (this.handler.getMouseManager().right) {
                this.handler.getGameCamera().setxOffset(this.startDrag.x - pos.x);
                this.handler.getGameCamera().setyOffset(this.startDrag.y - pos.y);

            }
        }

    })
    return World;
});
