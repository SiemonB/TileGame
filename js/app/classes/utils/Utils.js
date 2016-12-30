define(['Jquery'], function ($) {
    var Utils = {};
    var mapArray = [];

    Utils.loadFile = function () {

        var _mapWidth = 5;
        var _mapHeight = 5;
        var _spawnX = 3;
        var _spawnY = 3;

        var _mapArray = [
                0, 0, 0, 0, 0,
                0, 2, 2, 2, 0,
                0, 2, 0, 2, 0,
                0, 2, 2, 2, 0,
                0, 0, 0, 0, 0
                         ];

        _mapArray.unshift(_mapWidth, _mapHeight, _spawnX, _spawnY);

        return _mapArray;
    }

    return Utils;
});
