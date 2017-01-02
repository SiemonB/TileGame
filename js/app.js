requirejs.config({
    "baseUrl": "js",
    "paths": {
        //Libs
        "Class": "libs/class",
        "Jquery": "libs/jquery",
        //Classes
        "Assets": "app/classes/gfx/Assets",
        "Launcher": "app/classes/Launcher",
        "Game": "app/classes/Game",
        "ImageLoader": "app/classes/gfx/ImageLoader",
        "SpriteSheet": "app/classes/gfx/SpriteSheet",
        "State": "app/classes/states/State",
        "GameState": "app/classes/states/Gamestate",
        "Display": "app/classes/display/Display",
        "KeyManager": "app/classes/input/KeyManager",
        "Handler": "app/classes/Handler",
        "Entity": "app/classes/entities/Entity",
        "Creature": "app/classes/entities/creatures/Creature",
        "Player": "app/classes/entities/creatures/Player",
        "Tile": "app/classes/tiles/Tile",
        "TileLoader": "app/classes/tiles/TileLoader",
        "World": "app/classes/worlds/World",
        "Utils": "app/classes/utils/Utils",
        "GameCamera": "app/classes/gfx/GameCamera",
        "Rectangle": "app/classes/gfx/shapes/Rectangle",
        //Tiles
        "GrassTile": "app/classes/tiles/GrassTile",
        "DirtTile": "app/classes/tiles/DirtTile",
        "StoneTile": "app/classes/tiles/StoneTile",


    }
});

require(['app/main']);
