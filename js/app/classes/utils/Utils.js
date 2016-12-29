define(['Jquery'], function ($) {
    var Utils = {};
    Utils.loadFileAsString = function (_path) {
        var string = "";

        $.getScript(_path, function (data, textStatus, jqxhr) {
                string = data;
            })
            .fail(function (jqxhr, settings, exception) {
                alert("file:'" + _path + " can not be loaded");
            });

        console.log(string);

        /*
        $.ajax({
            url: _path,
            type: "get",
            async: false,
            success: function (_contents) {
                string = _contents;
            },
            error: function () {
                alert("file:'" + _path + " can not be loaded");
            }
        });
        */

        return string;
    };

    return Utils;
});