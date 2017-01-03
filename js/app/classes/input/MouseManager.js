define(['Class'], function (Class) {

    var buttons, handler, mouse, canvas;

    var MouseManager = Class.extend({
        init: function (_handler) {
            handler = _handler;
            mouse = {};
            buttons = [];
            canvas = handler.getDisplay().getCanvas();
            document.body.addEventListener("mousedown", startDrag, false);
            document.body.addEventListener("mouseup", function (e) {
                buttons[e.button] = false
            }, false);
            document.body.addEventListener("contextmenu", function (e) {
                e.preventDefault();
            }, false);
            document.body.addEventListener("mousemove", getPosition, false);
        },
        tick: function () {
            this.left = buttons[0];
            this.middle = buttons[1];
            this.right = buttons[2];
        },
        getMousePosition: function () {
            return {
                x: mouse.x,
                y: mouse.y
            };
        }


    });

    function startDrag(e) {
        var btn;
        e.preventDefault();
        buttons[e.button] = true;

        switch (e.button) {
        case 0:
            btn = "left";
            break;
        case 1:
            btn = "middle";
            break;
        case 2:
            btn = "right";
            break;
        }
        handler.click(btn);
    }

    function getPosition(e) {
        var x = e.clientX,
            y = e.clientY;

        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;
        mouse.x = x;
        mouse.y = y;

    }

    return MouseManager;
});
