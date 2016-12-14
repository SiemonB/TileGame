requirejs.config({
    "baseUrl":"js",
    "paths":{
        //Libs
        "Class":"libs/class",
        "Jquery":"libs/jquery",
        //Classes
        "Assets":"app/classes/gfx/Assets",
        "Launcher":"app/classes/Launcher",
        "Game":"app/classes/Game",
        "ImageLoader":"app/classes/gfx/ImageLoader",
        "SpriteSheet":"app/classes/gfx/SpriteSheet",
        "State":"app/classes/states/State",
        "GameState":"app/classes/states/Gamestate",
        "Display":"app/classes/display/Display",

    }
});

require(['app/main']);