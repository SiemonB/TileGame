define(['Class'], function(Class){

    var Entity = Class.extend({
        init: function(_handler, _x, _y, _width, _height){
            this.x = _x;
            this.y = _y;
            this.width = _width;
            this.height = _height;
        },
        tick: function(_dt){

        },
        render: function(_g){

        },

        //Getters
        getX: function(){
            return this.x;
        },
        getY: function(){
            return this.x;
        },
        getWidth: function(){
            return this.Width;
        },
        getHeight: function(){
            return this.Heigth;
        },

        //Setters
        setX: function(_x){
            this.x = _x;
        },
        setY: function(_y){
            this.y = _y;
        },
        setWidth: function(_width){
            this.width = _width;
        },
        setHeight: function(_height){
            this.height = _height;
        }


    });

    return Entity;
});
