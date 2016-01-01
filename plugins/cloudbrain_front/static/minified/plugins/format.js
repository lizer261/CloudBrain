/* SCEditor v1.4.7 | (C) 2015, Sam Clarke | sceditor.com/license */
!function (a) {
    "use strict";
    a.sceditor.plugins.format = function () {
        var b, c, d = this, e = {
            p: "Paragraph",
            h1: "Heading 1",
            h2: "Heading 2",
            h3: "Heading 3",
            h4: "Heading 4",
            h5: "Heading 5",
            h6: "Heading 6",
            address: "Address",
            pre: "Preformatted Text"
        };
        d.init = function () {
            var b = this.opts, d = b.paragraphformat;
            b.plugins && b.plugins.indexOf("bbcode") > -1 || (d && (d.tags && (e = d.tags), d.excludeTags && a.each(d.excludeTags, function (a, b) {
                delete e[b]
            })), this.commands.format || (this.commands.format = {
                exec: c,
                txtExec: c,
                tooltip: "Format Paragraph"
            }), b.toolbar === a.sceditor.defaultOptions.toolbar && (b.toolbar = b.toolbar.replace(",color,", ",color,format,")))
        }, b = function (a, b) {
            a.sourceMode() ? a.insert("<" + b + ">", "</" + b + ">") : a.execCommand("formatblock", "<" + b + ">")
        }, c = function (c) {
            var d = this, f = a("<div />");
            a.each(e, function (c, e) {
                a('<a class="sceditor-option" href="#">' + (e.name || e) + "</a>").click(function () {
                    return d.closeDropDown(!0), e.exec ? e.exec(d) : b(d, c), !1
                }).appendTo(f)
            }), d.createDropDown(c, "format", f)
        }
    }
}(jQuery);