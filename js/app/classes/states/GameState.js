define(['State', 'Player', 'World'], function (State, Player, World) {

    var GameState = State.extend({

        init: function (_handler) {
            this._super(_handler);
            this.player = new Player(_handler, 20, 20)
            this.world = new World("res/worlds/world1.js");
        },
        tick: function (_dt) {
            this.world.tick(_dt);
            this.player.tick(_dt);
        },
        render: function (_g) {
            this.world.render(_g);
            this.player.render(_g);

        }
    });

    return GameState;
});
