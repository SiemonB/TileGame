define(['Class', 'ImageLoader', 'SpriteSheet'], function (Class, ImageLoader, SpriteSheet) {
    var DEFAULT_WIDTH = 32,
        DEFAULT_HEIGHT = 32;
    var assets = {};

    var Assets = Class.extend({
        init: function (_name, _path, _width, _height) {
            assets[_name] = this;
            this.name = _name;
            this.path = _path;
            this.width = _width;
            this.height = _height;
            this.sheet = new SpriteSheet(ImageLoader.loadImage(this.path));
        }
    });

    Assets.DEFAULT_WIDTH = DEFAULT_WIDTH;
    Assets.DEFAULT_HEIGHT = DEFAULT_HEIGHT;
    Assets.getAssets = function (_name) {
        return assets[_name];
    };

    //Player Asset
    var player = new Assets("player", "res/textures/mario.png", 28, 42);
    player.idle = player.sheet.crop(0, 0, 28, 42);

    //Tile Asset
    var tiles = new Assets("tiles", "res/textures/tiles.png", 30, 30); //30*30 tilesize

    function tileSelector(_posX, _posY) { // Function deviated from tut
        _tile = tiles.sheet.crop(
            tiles.width * _posX,
            tiles.height * _posY,
            tiles.width,
            tiles.height);

        return _tile;
    }

    tiles.dirt = tileSelector(1, 10);
    tiles.grass = tileSelector(1, 2);
    tiles.stone = tileSelector(1, 7);

    return Assets;
});