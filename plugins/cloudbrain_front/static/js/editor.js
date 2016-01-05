/**
 * Created by root on 1/3/16.
 */

$(function () {
    $("textarea").sceditor({
        plugins: "bbcode",
        style: "minified/jquery.sceditor.default.min.css",
        locale: "ru",
        toolbar: "bold,italic,underline,bulletlist,orderedlist|left,center,right,justify,size",
        resizeEnabled: false

    });
});
$(document).ready(function () {
    var frame = $('iframe').contents();
    //add custom field theme in
    $('.sceditor-toolbar').append('<br><input id="theme" name="theme" placeholder="Название темы" type=text><br>');
});