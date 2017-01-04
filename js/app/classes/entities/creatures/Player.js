define(['Creature', 'Assets'], function (Creature, Assets) {

    var Player = Creature.extend({
        init: function (_handler, _x, _y) {
            this._super(_handler, _x, _y, Creature.DEFAULT_WIDTH, Creature.DEFAULT_HEIGHT);
            this.assets = Assets.getAssets("player");
            this.path = [];
            this.timeStopped = 0;

            //Collision box vars
            this.bounds.x = 16
            this.bounds.y = 32;
            this.bounds.width = 32;
            this.bounds.height = 32;

            //Test offsets to fit in a tile
            this.bounds.x -= 0.5;
            this.bounds.y -= 0.5;
            this.bounds.width -= 1;
            this.bounds.height -= 1;

        },
        tick: function (_dt) {
            //this.getInput(_dt);
            this.followPath(_dt);
            this.move();

            //this.handler.getGameCamera().centerOnEntitiy(this);

            this.assets.animations.walk_right.tick();
            this.assets.animations.walk_left.tick();
            this.assets.animations.walk_up.tick();
            this.assets.animations.walk_down.tick();
            this.assets.animations.idle.tick();
        },
        render: function (_g) {
            _g.myDrawImage( //Drawing player sprite
                this.getCurrentAnimationFrame(),
                this.x - this.handler.getGameCamera().getxOffset(),
                this.y - this.handler.getGameCamera().getyOffset(),
                this.width,
                this.height
            );
            if (_DEBUG_) {
                _g.lineWidth = 3;
                _g.strokeRect( //Drawing collision box
                    this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(),
                    this.bounds.y + this.y - this.handler.getGameCamera().getyOffset(),
                    this.bounds.width,
                    this.bounds.height
                );
                _g.lineWidth = 1;

            };
        },
        click: function (_btn) {
            if (_btn == "left") {
                var pos = this.handler.getMouseManager().getMousePosition();

                var waypoint = {
                    x: pos.x + this.handler.getGameCamera().getxOffset() - this.width / 2,
                    y: pos.y + this.handler.getGameCamera().getxOffset() - this.height / 2
                };

                this.path.push(waypoint);
            }
        },
        followPath: function (_dt) {
            if (this.path.length > 0) {
                var path = this.path[0];

                if (this.getDistance(path) >= 10 && this.timeStopped < .5) {
                    if (this.getMovementSpeed() < .2) {
                        this.timeStopped += 1 * _dt;
                    }

                    var angle = this.getAngleTo(path);
                    this.xMove = (Math.cos(angle) * this.speed) * _dt;
                    this.yMove = (Math.sin(angle) * this.speed) * _dt;
                } else {
                    this.timeStopped = 0;
                    this.path.splice(0, 1);
                }
            } else {
                this.xMove = 0;
                this.yMove = 0;
            }
        },
        getInput: function (_dt) {
            this.xMove = 0;
            this.yMove = 0;

            if (this.handler.getKeyManager().up) {
                this.yMove = -this.speed * _dt;
            }
            if (this.handler.getKeyManager().down) {
                this.yMove = this.speed * _dt;
            }
            if (this.handler.getKeyManager().left) {
                this.xMove = -this.speed * _dt;
            }
            if (this.handler.getKeyManager().right) {
                this.xMove = this.speed * _dt;
            }
        },
        getCurrentAnimationFrame: function () {
            if (this.xMove < 0 && Math.abs(this.xMove) > Math.abs(this.yMove)) {
                return this.assets.animations.walk_left.getCurrentFrame();
            } else if (this.xMove > 0 && Math.abs(this.xMove) > Math.abs(this.yMove)) {
                return this.assets.animations.walk_right.getCurrentFrame();
            } else if (this.yMove < 0 && Math.abs(this.xMove) < Math.abs(this.yMove)) {
                return this.assets.animations.walk_up.getCurrentFrame();
            } else if (this.yMove > 0 && Math.abs(this.xMove) < Math.abs(this.yMove)) {
                return this.assets.animations.walk_down.getCurrentFrame();
            } else {
                return this.assets.animations.idle.getCurrentFrame();
            }
        },

    })

    return Player;
});
