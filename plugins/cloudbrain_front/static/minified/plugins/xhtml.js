/* SCEditor v1.4.7 | (C) 2015, Sam Clarke | sceditor.com/license */
!function (a) {
    "use strict";
    var b = a.sceditor, c = b.plugins, d = b.dom, e = {
        bold: {txtExec: ["<strong>", "</strong>"]},
        italic: {txtExec: ["<em>", "</em>"]},
        underline: {txtExec: ['<span style="text-decoration: underline;">', "</span>"]},
        strike: {txtExec: ['<span style="text-decoration: line-through;">', "</span>"]},
        subscript: {txtExec: ["<sub>", "</sub>"]},
        superscript: {txtExec: ["<sup>", "</sup>"]},
        left: {txtExec: ['<div style="text-align: left;">', "</div>"]},
        center: {txtExec: ['<div style="text-align: center;">', "</div>"]},
        right: {txtExec: ['<div style="text-align: right;">', "</div>"]},
        justify: {txtExec: ['<div style="text-align: justify;">', "</div>"]},
        font: {
            txtExec: function (a) {
                var c = this;
                b.command.get("font")._dropDown(c, a, function (a) {
                    c.insertText('<span style="font-family: ' + a + ';">', "</span>")
                })
            }
        },
        size: {
            txtExec: function (a) {
                var c = this;
                b.command.get("size")._dropDown(c, a, function (a) {
                    c.insertText('<span style="font-size: ' + a + ';">', "</span>")
                })
            }
        },
        color: {
            txtExec: function (a) {
                var c = this;
                b.command.get("color")._dropDown(c, a, function (a) {
                    c.insertText('<span style="color: ' + a + ';">', "</span>")
                })
            }
        },
        bulletlist: {txtExec: ["<ul><li>", "</li></ul>"]},
        orderedlist: {txtExec: ["<ol><li>", "</li></ol>"]},
        table: {txtExec: ["<table><tr><td>", "</td></tr></table>"]},
        horizontalrule: {txtExec: ["<hr />"]},
        code: {txtExec: ["<code>", "</code>"]},
        image: {
            txtExec: function (a, b) {
                var c = prompt(this._("Enter the image URL:"), b);
                c && this.insertText('<img src="' + c + '" />')
            }
        },
        email: {
            txtExec: function (a, b) {
                var c, d, e = b && b.indexOf("@") > -1 ? null : b;
                c = prompt(this._("Enter the e-mail address:"), e ? "" : b), d = prompt(this._("Enter the displayed text:"), e || c) || c, c && this.insertText('<a href="mailto:' + c + '">' + d + "</a>")
            }
        },
        link: {
            txtExec: function (a, b) {
                var c = b && b.indexOf("http://") > -1 ? null : b, d = prompt(this._("Enter URL:"), c ? "http://" : b), e = prompt(this._("Enter the displayed text:"), c || d) || d;
                d && this.insertText('<a href="' + d + '">' + e + "</a>")
            }
        },
        quote: {txtExec: ["<blockquote>", "</blockquote>"]},
        youtube: {
            txtExec: function (a) {
                var c = this;
                b.command.get("youtube")._dropDown(c, a, function (a) {
                    c.insertText('<iframe width="560" height="315" src="http://www.youtube.com/embed/{id}?wmode=opaque" data-youtube-id="' + a + '" frameborder="0" allowfullscreen></iframe>')
                })
            }
        },
        rtl: {txtExec: ['<div stlye="direction: rtl;">', "</div>"]},
        ltr: {txtExec: ['<div stlye="direction: ltr;">', "</div>"]}
    };
    b.XHTMLSerializer = function () {
        var c, e, f, g, h, i, j, k, l, m, n = this, o = {indentStr: "	"}, p = [], q = 0;
        c = function (a) {
            var b = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"};
            return a ? a.replace(/[&<>"]/g, function (a) {
                return b[a] || a
            }) : ""
        }, e = function (a) {
            return a.replace(/[\r\n]/, " ").replace(/[^\S|\u00A0]+/g, " ")
        }, n.serialize = function (a, b) {
            if (p = [], b)for (a = a.firstChild; a;)f(a), a = a.nextSibling; else f(a);
            return p.join("")
        }, f = function (a, b) {
            switch (a.nodeType) {
                case 1:
                    var c = a.nodeName.toLowerCase();
                    "!" === c ? j(a) : h(a, b);
                    break;
                case 3:
                    k(a, b);
                    break;
                case 4:
                    i(a);
                    break;
                case 8:
                    j(a);
                    break;
                case 9:
                case 11:
                    g(a);
                    break;
                case 2:
                case 5:
                case 6:
                case 7:
                case 10:
                case 12:
            }
        }, g = function (a) {
            for (var b = a.firstChild; b;)f(b), b = b.nextSibling
        }, h = function (e, g) {
            var h, i, j, k = e.nodeName.toLowerCase(), n = "iframe" === k, o = e.attributes.length, p = e.firstChild, r = g || /pre(?:\-wrap)?$/i.test(a(e).css("whiteSpace")), s = !e.firstChild && !d.canHaveChildren(e) && !n;
            if (!a(e).hasClass("sceditor-ignore")) {
                for (l("<" + k, !g && m(e)); o--;)i = e.attributes[o], (!b.ie || i.specified || "input" === k && "value" === i.name) && (j = b.ie < 8 && /style/i.test(i.name) ? e.style.cssText : i.value, l(" " + i.name.toLowerCase() + '="' + c(j) + '"', !1));
                for (l(s ? " />" : ">", !1), n || (h = p); h;)q++, f(h, r), h = h.nextSibling, q--;
                s || l("</" + k + ">", !r && !n && m(e) && p && m(p))
            }
        }, i = function (a) {
            l("<![CDATA[" + c(a.nodeValue) + "]]>")
        }, j = function (a) {
            l("<!-- " + c(a.nodeValue) + " -->")
        }, k = function (a, b) {
            var d = a.nodeValue;
            b || (d = e(d)), d && l(c(d), !b && m(a))
        }, l = function (a, b) {
            var c = q;
            if (b !== !1)for (p.length && p.push("\n"); c--;)p.push(o.indentStr);
            p.push(a)
        }, m = function (a) {
            var b = a.previousSibling;
            return 1 !== a.nodeType && b ? !d.isInline(b) : b || d.isInline(a.parentNode) ? !d.isInline(a) : !0
        }
    }, c.xhtml = function () {
        var f, g, h, i, j, k, l, m = this, n = {}, o = {};
        m.init = function () {
            a.isEmptyObject(c.xhtml.converters || {}) || a.each(c.xhtml.converters, function (b, c) {
                a.each(c.tags, function (a) {
                    n[a] || (n[a] = []), n[a].push(c)
                })
            }), this.commands = a.extend(!0, {}, e, this.commands)
        }, m.signalToSource = function (a, c) {
            return c = c.jquery ? c[0] : c, f(c), i(c), k(c), l(c), (new b.XHTMLSerializer).serialize(c, !0)
        }, m.signalToWysiwyg = function (a) {
            return a
        }, m.convertTagTo = d.convertElement, g = function (c, d, e) {
            n[c] && a.each(n[c], function (f, g) {
                g.tags[c] ? a.each(g.tags[c], function (c, f) {
                    e.getAttributeNode && (c = e.getAttributeNode(c), !c || b.ie < 8 && !c.specified || f && a.inArray(c.value, f) < 0 || g.conv.call(m, e, d))
                }) : g.conv && g.conv.call(m, e, d)
            })
        }, f = function (b) {
            d.traverse(b, function (b) {
                var c = a(b), d = b.nodeName.toLowerCase();
                g("*", c, b), g(d, c, b)
            }, !0)
        }, h = function (a, b) {
            var c = a.childNodes, e = a.nodeName.toLowerCase(), f = a.nodeValue, g = c.length;
            if (b && "br" === e)return !0;
            if (!d.canHaveChildren(a))return !1;
            if (f && /\S|\u00A0/.test(f))return !1;
            for (; g--;)if (!h(c[g], !a.previousSibling && !a.nextSibling))return !1;
            return !0
        }, i = function (b) {
            d.traverse(b, function (b) {
                var e, f = b.nodeName.toLowerCase(), g = "iframe" !== f && h(b), i = b.parentNode, j = b.nodeType, k = !d.isInline(b), l = b.previousSibling, m = b.nextSibling, n = b.ownerDocument, o = c.xhtml.allowedTags, p = c.xhtml.disallowedTags;
                if (3 !== j && (4 === j ? f = "!cdata" : ("!" === f || 8 === j) && (f = "!comment"), g ? e = !0 : o && o.length ? e = a.inArray(f, o) < 0 : p && p.length && (e = a.inArray(f, p) > -1), e)) {
                    if (!g) {
                        for (k && l && d.isInline(l) && i.insertBefore(n.createTextNode(" "), b); b.firstChild;)i.insertBefore(b.firstChild, m);
                        k && m && d.isInline(m) && i.insertBefore(n.createTextNode(" "), m)
                    }
                    i.removeChild(b)
                }
            }, !0)
        }, j = function (b, c) {
            var d = {};
            return b && a.extend(d, b), c ? (a.each(c, function (b, c) {
                a.isArray(c) ? d[b] = a.merge(d[b] || [], c) : d[b] || (d[b] = null)
            }), d) : d
        }, l = function (b) {
            var c = [], e = function () {
                c.length && (a("<p>", b.ownerDocument).insertBefore(c[0]).append(c), c = [])
            };
            d.removeWhiteSpace(b);
            for (var f = b.firstChild; f;)d.isInline(f) && !a(f).is(".sceditor-ignore") ? c.push(f) : e(), f = f.nextSibling;
            e()
        }, k = function (b) {
            var e, f, g, h, i, k, l = c.xhtml.allowedAttribs, m = l && !a.isEmptyObject(l), n = c.xhtml.disallowedAttribs, p = n && !a.isEmptyObject(n);
            o = {}, d.traverse(b, function (b) {
                if (b.attributes && (e = b.nodeName.toLowerCase(), h = b.attributes.length))for (o[e] || (o[e] = m ? j(l["*"], l[e]) : j(n["*"], n[e])); h--;)f = b.attributes[h], g = f.name, i = o[e][g], k = !1, m ? k = null !== i && (!a.isArray(i) || a.inArray(f.value, i) < 0) : p && (k = null === i || a.isArray(i) && a.inArray(f.value, i) > -1), k && b.removeAttribute(g)
            })
        }
    }, c.xhtml.converters = [{
        tags: {"*": {width: null}}, conv: function (a, b) {
            b.css("width", b.attr("width")).removeAttr("width")
        }
    }, {
        tags: {"*": {height: null}}, conv: function (a, b) {
            b.css("height", b.attr("height")).removeAttr("height")
        }
    }, {
        tags: {li: {value: null}}, conv: function (a, c) {
            b.ie < 8 ? a.removeAttribute("value") : c.removeAttr("value")
        }
    }, {
        tags: {"*": {text: null}}, conv: function (a, b) {
            b.css("color", b.attr("text")).removeAttr("text")
        }
    }, {
        tags: {"*": {color: null}}, conv: function (a, b) {
            b.css("color", b.attr("color")).removeAttr("color")
        }
    }, {
        tags: {"*": {face: null}}, conv: function (a, b) {
            b.css("fontFamily", b.attr("face")).removeAttr("face")
        }
    }, {
        tags: {"*": {align: null}}, conv: function (a, b) {
            b.css("textAlign", b.attr("align")).removeAttr("align")
        }
    }, {
        tags: {"*": {border: null}}, conv: function (a, b) {
            b.css("borderWidth", b.attr("border")).removeAttr("border")
        }
    }, {
        tags: {
            applet: {name: null},
            img: {name: null},
            layer: {name: null},
            map: {name: null},
            object: {name: null},
            param: {name: null}
        }, conv: function (a, b) {
            b.attr("id") || b.attr("id", b.attr("name")), b.removeAttr("name")
        }
    }, {
        tags: {"*": {vspace: null}}, conv: function (a, b) {
            b.css("marginTop", b.attr("vspace") - 0).css("marginBottom", b.attr("vspace") - 0).removeAttr("vspace")
        }
    }, {
        tags: {"*": {hspace: null}}, conv: function (a, b) {
            b.css("marginLeft", b.attr("hspace") - 0).css("marginRight", b.attr("hspace") - 0).removeAttr("hspace")
        }
    }, {
        tags: {hr: {noshade: null}}, conv: function (a, b) {
            b.css("borderStyle", "solid").removeAttr("noshade")
        }
    }, {
        tags: {"*": {nowrap: null}}, conv: function (a, b) {
            b.css("white-space", "nowrap").removeAttr("nowrap")
        }
    }, {
        tags: {big: null}, conv: function (b) {
            a(this.convertTagTo(b, "span")).css("fontSize", "larger")
        }
    }, {
        tags: {small: null}, conv: function (b) {
            a(this.convertTagTo(b, "span")).css("fontSize", "smaller")
        }
    }, {
        tags: {b: null}, conv: function (b) {
            a(this.convertTagTo(b, "strong"))
        }
    }, {
        tags: {u: null}, conv: function (b) {
            a(this.convertTagTo(b, "span")).css("textDecoration", "underline")
        }
    }, {
        tags: {i: null}, conv: function (b) {
            a(this.convertTagTo(b, "em"))
        }
    }, {
        tags: {s: null, strike: null}, conv: function (b) {
            a(this.convertTagTo(b, "span")).css("textDecoration", "line-through")
        }
    }, {
        tags: {dir: null}, conv: function (a) {
            this.convertTagTo(a, "ul")
        }
    }, {
        tags: {center: null}, conv: function (b) {
            a(this.convertTagTo(b, "div")).css("textAlign", "center")
        }
    }, {
        tags: {font: {size: null}}, conv: function (a, c) {
            var d = c.css("fontSize"), e = d;
            "+0" !== e && (b.ie < 9 && (e = 10, d > 1 && (e = 13), d > 2 && (e = 16), d > 3 && (e = 18), d > 4 && (e = 24), d > 5 && (e = 32), d > 6 && (e = 48)), c.css("fontSize", e)), c.removeAttr("size")
        }
    }, {
        tags: {font: null}, conv: function (a) {
            this.convertTagTo(a, "span")
        }
    }, {
        tags: {"*": {type: ["_moz"]}}, conv: function (a, b) {
            b.removeAttr("type")
        }
    }, {
        tags: {"*": {_moz_dirty: null}}, conv: function (a, b) {
            b.removeAttr("_moz_dirty")
        }
    }, {
        tags: {"*": {_moz_editor_bogus_node: null}}, conv: function (a, b) {
            b.remove()
        }
    }], c.xhtml.allowedAttribs = {}, c.xhtml.disallowedAttribs = {}, c.xhtml.allowedTags = [], c.xhtml.disallowedTags = []
}(jQuery);