define(['Class', 'ImageLoader', 'SpriteSheet', 'Animation'], function (Class, ImageLoader, SpriteSheet, Animation) {
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
            this.animations = {};
        },
        addAnimation: function (_name, _animation) {
            this.animations[_name] = _animation;
        }
    });

    Assets.DEFAULT_WIDTH = DEFAULT_WIDTH;
    Assets.DEFAULT_HEIGHT = DEFAULT_HEIGHT;
    Assets.getAssets = function (_name) {
        return assets[_name];
    };

    //Create Player Assets
    var player = new Assets("player", "res/textures/link.png", 120, 130);

    //Build Animated Frames
    var frameSpeed = 120,
        walkRightFrames = [],
        walkLeftFrames = [],
        walkUpFrames = [],
        walkDownFrames = [],

        walkRightRow = 7,
        walkLeftRow = 5,
        walkUpRow = 6,
        walkDownRow = 4;

    for (var i = 0; i < 10; i++) {
        walkRightFrames.push({
            frame: player.sheet.crop(player.width * i, player.height * walkRightRow, player.width, player.height),
            speed: frameSpeed
        });
        walkLeftFrames.push({
            frame: player.sheet.crop(player.width * i, player.height * walkLeftRow, player.width, player.height),
            speed: frameSpeed
        });
        walkUpFrames.push({
            frame: player.sheet.crop(player.width * i, player.height * walkUpRow, player.width, player.height),
            speed: frameSpeed
        });
        walkDownFrames.push({
            frame: player.sheet.crop(player.width * i, player.height * walkDownRow, player.width, player.height),
            speed: frameSpeed
        });
    }

    var idleFrames = [
        {
            frame: player.sheet.crop(0, 0, player.width, player.height),
            speed: frameSpeed * 80
        },
        {
            frame: player.sheet.crop(player.width, 0, player.width, player.height),
            speed: frameSpeed
        },
        {
            frame: player.sheet.crop(player.width * 2, 0, player.width, player.height),
            speed: frameSpeed
        },
];

    //Create Animations

    player.addAnimation("walk_right", new Animation(walkRightFrames));
    player.addAnimation("walk_left", new Animation(walkLeftFrames));
    player.addAnimation("walk_up", new Animation(walkUpFrames));
    player.addAnimation("walk_down", new Animation(walkDownFrames));
    player.addAnimation("idle", new Animation(idleFrames));

    //Tree Assets
    var tree = new Assets("tree", "res/textures/tree_01.png", 726, 798);
    tree.redwood = tree.sheet.crop(0, 0, 726, 798);

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

    tiles.dirt = tileSelector(15, 2);
    tiles.grass = tileSelector(0, 1);
    tiles.stone = tileSelector(0, 7);

    return Assets;
});
