define(['Class', 'Rectangle'], function (Class, Rectangle) {

    var Entity = Class.extend({
        init: function (_handler, _x, _y, _width, _height) {
            this.x = _x;
            this.y = _y;
            this.width = _width;
            this.height = _height;
            this.handler = _handler;
            this.bounds = new Rectangle(0, 0, _width, _height);

        },
        tick: function (_dt) {
            throw ("Entities Must Have a Tick Function!");
        },
        render: function (_g) {
            throw ("Entities Must Have a Render Function!");
        },
        click: function () {
            throw ("Entities Must Have a Click Function!");
        },
        getCollisionBounds: function (xOffset, yOffset) {
            return new Rectangle(
                parseInt(this.x + this.bounds.x + xOffset),
                parseInt(this.y + this.bounds.y + yOffset),
                this.bounds.width,
                this.bounds.height
            );
        },
        isStatic: function () {
            return false;
        },
        checkEntityCollisions: function (xOffset, yOffset) {
            var candidates = this.handler.getWorld().getSpatialGrid().retrieve(new Rectangle(
                this.x + this.bounds.x + xOffset,
                this.y + this.bounds.y + yOffset,
                this.bounds.width,
                this.bounds.height
            ), this);

            //console.log(candidates.length); //Prints the ammount of entities being checked!

            for (var i = 0; i < candidates.length; i++) {
                var e = candidates[i];
                if (e != this) {
                    if (e.getCollisionBounds(0, 0).intersects(this.getCollisionBounds(xOffset, yOffset))) {
                        return true;
                    }
                }
            }
            return false;
        },

        //Getters
        getX: function () {
            return this.x;
        },
        getY: function () {
            return this.y;
        },
        getWidth: function () {
            return this.width;
        },
        getHeight: function () {
            return this.height;
        },

        //Setters
        setX: function (_x) {
            this.x = _x;
        },
        setY: function (_y) {
            this.y = _y;
        },
        setWidth: function (_width) {
            this.width = _width;
        },
        setHeight: function (_height) {
            this.height = _height;
        },
        getDistance: function (_e) {
            var xDist = this.x - _e.x;
            var yDist = this.y - _e.y;

            return Math.sqrt(xDist * xDist + yDist * yDist);
        },
        getAngleTo: function (_e) {
            var xDist = _e.x - this.x;
            var yDist = _e.y - this.y;

            return Math.atan2(yDist, xDist);
        }


    });

    return Entity;
});
