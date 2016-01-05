//color of drawing thing
var color = 'black';
//add custom plugins in sceditor
String.prototype.replaceAll = function (token, newToken, ignoreCase) {
    var _token;
    var str = this + "";
    var i = -1;

    if (typeof token === "string") {

        if (ignoreCase) {

            _token = token.toLowerCase();

            while ((
                i = str.toLowerCase().indexOf(
                    token, i >= 0 ? i + newToken.length : 0
                ) ) !== -1
                ) {
                str = str.substring(0, i) +
                    newToken +
                    str.substring(i + token.length);
            }

        } else {
            return this.split(token).join(newToken);
        }

    }
    return str;
};
//nulled canvas for new drawing
function start() {
    var canvas = document.getElementById('can');
    var context = canvas.getContext("2d");
    $('#can').css('width', '100');
    $('#can').css('height', '100');
    $('#can').css('top', '0');
    $('#can').css('left', '0');
    $('#can').css('z-index', '-1');
    canvas.width = 100;
    canvas.height = 100;
    var draw = false;
}
//on creating elements:
$(document).ready(function () {
    //2 canvas for saving data in one
    var canvas = document.getElementById('can');
    var context = canvas.getContext("2d");
    var fakecanvas = document.getElementById('fake');
    var fakecontext = fakecanvas.getContext("2d");
    //make one of them bigger for good working whith save
    fakecanvas.width += 20;
    fakecanvas.height += 20;
    //make 0 0 in center
    context.translate(canvas.width / 2, canvas.height / 2);
    //draw var for check click
    var draw;
    //function for start to draw
    function mouse_down(e) {
        var h = e.pageX - Number($('#can').css('left').replace('px', ''));
        var w = e.pageY - Number($('#can').css('top').replace('px', ''));
        draw = true;
        context.beginPath();
        context.lineWidth = 3;
        context.lineJoin = context.lineCap = 'round';
        context.shadowBlur = 0;
        context.shadowColor = 'rgb(0, 0, 0)';
        context.moveTo(h, w);
    }

    //hide canvas
    $('#can').css('z-index', '-1');
    //get iframe
    var iframepos = $("iframe").position();
    //stop drawing
    $('iframe').contents().find('html').on('mouseup', function (e) {
        draw = false;
        context.stroke();
    });
    //drawing if mouse pressed
    $('iframe').contents().find('html').on('mousemove', function (e) {
        if (draw) {
            $('#can').css('z-index', '10');
            var h = e.pageX - Number($('#can').css('left').replace('px', ''));
            var w = e.pageY - Number($('#can').css('top').replace('px', ''));
            context.lineWidth = 3;
            context.lineJoin = context.lineCap = 'round';
            context.shadowBlur = 0;
            context.shadowColor = color;
            context.lineTo(h, w);
            context.strokeStyle = color;
            context.stroke();
        }
    });
    //drawing=true
    $('iframe').contents().find('html').on('mousedown', function (e) {
        //THIS IS DRAWING
        $('#can').css('left', e.pageX + 5 - 25);
        $('#can').css('top', e.pageY + 105 - 25);
        context.translate(canvas.width / 2, canvas.height / 2);
        mouse_down(e);
        //hide menu
        $('#menu').hide(30);
    });
    //stop drawing
    $('#can').on('mouseup', function (e) {
        draw = false;
        context.stroke();
    });
    //drawing=true
    $('#can').on('mousedown', function (e) {
        mouse_down(e);

    });
    //drawing if mouse pressed
    //expand drawing area
    $('#can').on('mousemove', function (e) {
        if (e.pageY - Number($('#can').css('top').replace('px', '')) - Number($('#can').css('height').replace('px', '')) > -20) {
            x();
        }
        if (e.pageX - Number($('#can').css('left').replace('px', '')) - Number($('#can').css('width').replace('px', '')) > -20) {
            y();
        }
        if (e.pageX - Number($('#can').css('left').replace('px', '')) < 20) {
            fakecontext.drawImage(canvas, 0, 0);
            $('#can').css('left', Number($('#can').css('left').replace('px', '')) - 20);
            $('#can').css('width', Number($('#can').css('width').replace('px', '')) + 20);
            canvas.width += 20;
            context.translate(+20, +0);
            context.drawImage(fakecanvas, 0, 0);
            fakecanvas.width += 20;
            y();
        }
        if (e.pageY - Number($('#can').css('top').replace('px', '')) < 20) {
            fakecontext.drawImage(canvas, 0, 0);
            $('#can').css('top', Number($('#can').css('top').replace('px', '')) - 20);
            $('#can').css('height', Number($('#can').css('height').replace('px', '')) + 20);
            canvas.height += 20;
            context.translate(+0, +20);
            context.drawImage(fakecanvas, 0, 0);
            fakecanvas.height += 20;
            x();
        }
        if (draw) {
            $('#can').css('z-index', '10');
            var h = e.pageX - Number($('#can').css('left').replace('px', ''));
            var w = e.pageY - Number($('#can').css('top').replace('px', ''));
            context.lineWidth = 3;
            context.lineJoin = context.lineCap = 'round';
            context.shadowBlur = 0;
            context.shadowColor = color;
            context.lineTo(h + 1, w + 1);
            context.strokeStyle = color;
            context.stroke();
        }
    });
    //for good work you need expand both (up an righth)
    function x() {
        fakecontext.drawImage(canvas, 0, 0);
        $('#can').css('height', Number($('#can').css('height').replace('px', '')) + 20);
        canvas.height += 20;
        context.drawImage(fakecanvas, 0, 0);
        fakecanvas.height += 20;
    }

    function y() {
        fakecontext.drawImage(canvas, 0, 0);
        $('#can').css('width', Number($('#can').css('width').replace('px', '')) + 20);
        canvas.width += 20;
        context.drawImage(fakecanvas, 0, 0);
        fakecanvas.width += 20;
    }

    //if enter - post img
    //if 12345 -- color
    $('html').bind('keypress', function (e) {
        if (e.keyCode == 13) {
            var dataURL = canvas.toDataURL();
            $('textarea').sceditor('instance').insert('[img]' + dataURL + '[/img]');
            start();
            $('iframe').contents().find('img').attr('src', $('iframe').contents().find('src').replaceAll(
                'http://localhost:63342/No_Name/static/'
            ));
        }
        else if (e.which == 49) {
            color = 'black';
        }
        else if (e.which == 50) {
            color = 'white'
        }
        else if (e.which == 51) {
            color = 'green'
        }
        else if (e.which == 52) {
            color = 'red'
        }
        else if (e.which == 53) {
            color = 'blue'
        }
        else {
            start();
        }
    });
    $('iframe').contents().bind('keypress', function (e) {
        if (e.keyCode != 1301023130) {
            start();
        }
    });
    $('iframe').contents().bind("contextmenu", function (event) {
        // Avoid the real one
        event.preventDefault();

        // Show contextmenu
        start();
        // In the right position (the mouse)
        $("#menu").css('display', 'block');
        $("#menu").css('top', event.pageY);
        $("#menu").css('left', event.pageX);
    });
    $(document).contents().bind("contextmenu", function (event) {
        // Avoid the real one
        event.preventDefault();
        start();
        // Show contextmenu
        $("#menu").css('display', 'block');
        $("#menu").css('top', event.pageY);
        $("#menu").css('left', event.pageX);
    });
    $('.sceditor-group').appendTo('#menu_in');
    $('<br><br>').insertAfter('.sceditor-group:eq(0)');
    $('#menu').on('mousedown', function (e) {
        $(this).hide(30)
    })

});