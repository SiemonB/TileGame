define(['Class'], function(Class){

    var keys = [];

    var KeyManager = Class.extend({
        init: function(){},
        tick: function(){
            /*
            this.up = keys[87];         // "W" key
            this.down = keys[83];       // "S" key
            this.left = keys[65];       // "A" key
            this.right = keys[68];      // "D" key
            */
            this.up = keys[38];         // "Up" key
            this.down = keys[40];       // "Down" key
            this.left = keys[37];       // "Left" key
            this.right = keys[39];      // "Right" key
        }
    });

    window.onkeydown = function(e){
        keys[e.keyCode] = true;
    };

    window.onkeyup = function(e){
        keys[e.keyCode] = false;
    };

    return KeyManager;
});
