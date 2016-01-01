/* SCEditor v1.4.7 | (C) 2015, Sam Clarke | sceditor.com/license */
!function (a) {
    "use strict";
    a.sceditor.plugins.undo = function () {
        var a, b, c = this, d = 0, e = 50, f = [], g = [], h = !1, i = function (c) {
            h = !0, b = c.value, a.sourceMode(c.sourceMode), a.val(c.value, !1), a.focus(), c.sourceMode ? a.sourceEditorCaret(c.caret) : a.getRangeHelper().restoreRange(), h = !1
        }, j = function (a, b) {
            var c, d, e, f, g = a.length, h = b.length, i = Math.max(g, h);
            for (c = 0; i > c && a.charAt(c) === b.charAt(c); c++);
            for (e = h > g ? h - g : 0, f = g > h ? g - h : 0, d = i - 1; d >= 0 && a.charAt(d - e) === b.charAt(d - f); d--);
            return d - c + 1
        };
        c.init = function () {
            a = this, e = a.undoLimit || e, a.addShortcut("ctrl+z", c.undo), a.addShortcut("ctrl+shift+z", c.redo), a.addShortcut("ctrl+y", c.redo)
        }, c.undo = function () {
            var b = g.pop(), c = a.val(null, !1);
            return b && !f.length && c === b.value && (b = g.pop()), b && (f.length || f.push({
                caret: a.sourceEditorCaret(),
                sourceMode: a.sourceMode(),
                value: c
            }), f.push(b), i(b)), !1
        }, c.redo = function () {
            var a = f.pop();
            return g.length || (g.push(a), a = f.pop()), a && (g.push(a), i(a)), !1
        }, c.signalReady = function () {
            var c = a.val(null, !1);
            b = c, g.push({caret: this.sourceEditorCaret(), sourceMode: this.sourceMode(), value: c})
        }, c.signalValuechangedEvent = function (c) {
            var i = c.rawValue;
            e > 0 && g.length > e && g.shift(), !h && b && b !== i && (f.length = 0, d += j(b, i), 20 > d || 50 > d && !/\s$/g.test(c.rawValue) || (g.push({
                caret: a.sourceEditorCaret(),
                sourceMode: a.sourceMode(),
                value: i
            }), d = 0, b = i))
        }
    }
}(jQuery);