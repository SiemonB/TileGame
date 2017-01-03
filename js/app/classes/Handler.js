define(['Class'], function (Class) {

    var game, world;

    var Handler = Class.extend({
        init: function (_game) {
            game = _game;
        },
        getWidth: function () {
            return game.getWidth();
        },
        getHeight: function () {
            return game.getHeight();
        },
        getKeyManager: function () {
            return game.getKeyManager();
        },
        getMouseManager: function () {
            return game.getMouseManager();
        },
        getGameCamera: function () {
            return game.getGameCamera();
        },
        setWorld: function (_world) {
            world = _world;
        },
        click: function (_btn) {
            game.click();
        },
        getWorld: function () {
            return world;
        },
        getDisplay: function () {
            return game.getDisplay();
        },
    });

    return Handler;
});
