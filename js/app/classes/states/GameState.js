define(['State', 'Player', 'TileLoader'], function (State, Player, Tile) {

    var GameState = State.extend({

        init: function (_handler) {
            this._super(_handler);
            this.player = new Player(_handler, 20, 20)
        },
        tick: function (_dt) {
            this.player.tick(_dt);
        },
        render: function (_g) {
            this.player.render(_g);
            Tile.tiles[0].render(_g, 0, 0); //Array is empty for some reason, guessing it should contain the contents of the same array in Tiles.js


        }
    });

    return GameState;
});
