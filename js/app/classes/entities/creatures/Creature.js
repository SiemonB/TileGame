define(['Entity', 'Tile', 'Rectangle'], function (Entity, Tile, Rectangle) {

    var DEFAULT_SPEED = 250,
        DEFAULT_HEALTH = 10,
        DEFAULT_CREATURE_WIDTH = 64,
        DEFAULT_CREATURE_HEIGTH = 64;

    var Creature = Entity.extend({
        init: function (_handler, _x, _y, _width, _height) {
            this._super(_handler, _x, _y, Creature.DEFAULT_CREATURE_WIDTH, Creature.DEFAULT_CREATURE_HEIGTH);
            this.health = DEFAULT_HEALTH;
            this.speed = DEFAULT_SPEED;
            this.xMove = 0;
            this.yMove = 0;

        },
        move: function () {
            if (Math.abs(this.xMove) > 0 || Math.abs(this.yMove) > 0) {
                this.handler.getWorld().getSpatialGrid().remove(new Rectangle(
                    this.x + this.bounds.x,
                    this.y + this.bounds.y,
                    this.bounds.width,
                    this.bounds.height
                ), this);

                if (!this.checkEntityCollisions(this.xMove, 0))
                    this.moveX();
                if (!this.checkEntityCollisions(0, this.yMove))
                    this.moveY();

                this.handler.getWorld().getSpatialGrid().insert(new Rectangle(
                    this.x + this.bounds.x,
                    this.y + this.bounds.y,
                    this.bounds.width,
                    this.bounds.height
                ), this);
            }
        },
        moveX: function () {
            if (this.xMove > 0) {
                var tx = parseInt((this.x + this.xMove + this.bounds.x + this.bounds.width) / Tile.DEFAULT_TILE_WIDTH);
                if (!this.collisionWithTile(tx, parseInt((this.y + this.bounds.y) / Tile.DEFAULT_TILE_HEIGHT)) &&
                    !this.collisionWithTile(tx, parseInt((this.y + this.bounds.y + this.bounds.height) / Tile.DEFAULT_TILE_HEIGHT))) {
                    this.x += this.xMove;
                } else {
                    this.x = tx * Tile.DEFAULT_TILE_WIDTH - this.bounds.x - this.bounds.width - 1;
                }
            } else {
                var tx = parseInt((this.x + this.xMove + this.bounds.x) / Tile.DEFAULT_TILE_WIDTH);
                if (!this.collisionWithTile(tx, parseInt((this.y + this.bounds.y) / Tile.DEFAULT_TILE_HEIGHT)) &&
                    !this.collisionWithTile(tx, parseInt((this.y + this.bounds.y + this.bounds.height) / Tile.DEFAULT_TILE_HEIGHT))) {
                    this.x += this.xMove;
                } else {
                    this.x = tx * Tile.DEFAULT_TILE_WIDTH + Tile.DEFAULT_TILE_WIDTH - this.bounds.x;
                }
            }
        },
        moveY: function () {
            if (this.yMove > 0) {
                var ty = parseInt((this.y + this.yMove + this.bounds.y + this.bounds.height) / Tile.DEFAULT_TILE_HEIGHT);
                if (!this.collisionWithTile(parseInt((this.x + this.bounds.x) / Tile.DEFAULT_TILE_WIDTH), ty) &&
                    !this.collisionWithTile(parseInt((this.x + this.bounds.x + this.bounds.width) / Tile.DEFAULT_TILE_WIDTH), ty)) {
                    this.y += this.yMove;
                } else {
                    this.y = ty * Tile.DEFAULT_TILE_HEIGHT - this.bounds.y - this.bounds.height - 1;
                }
            } else {
                var ty = parseInt((this.y + this.yMove + this.bounds.y) / Tile.DEFAULT_TILE_HEIGHT);
                if (!this.collisionWithTile(parseInt((this.x + this.bounds.x) / Tile.DEFAULT_TILE_WIDTH), ty) &&
                    !this.collisionWithTile(parseInt((this.x + this.bounds.x + this.bounds.width) / Tile.DEFAULT_TILE_WIDTH), ty)) {
                    this.y += this.yMove;
                } else {
                    this.y = ty * Tile.DEFAULT_TILE_HEIGHT + Tile.DEFAULT_TILE_HEIGHT - this.bounds.y;
                }

            }
        },
        collisionWithTile: function (_x, _y) {
            return this.handler.getWorld().getTile(_x, _y).isSolid();
        },

        //Getters
        getHealth: function () {
            return this.health;
        },
        getSpeed: function () {
            return this.speed;
        },

        //Setters
        setHealth: function () {
            this.health = _health;
        },
        setSpeed: function () {
            this.speed = _speed;
        }

    })

    //Static Variables
    Creature.DEFAULT_SPEED = DEFAULT_SPEED;
    Creature.DEFAULT_HEALTH = DEFAULT_HEALTH;
    Creature.DEFAULT_CREATURE_WIDTH = DEFAULT_CREATURE_WIDTH;
    Creature.DEFAULT_CREATURE_HEIGTH = DEFAULT_CREATURE_HEIGTH;

    return Creature;
});
