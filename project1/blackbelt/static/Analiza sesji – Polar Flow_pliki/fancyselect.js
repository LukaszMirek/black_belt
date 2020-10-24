(function() {
    $.fn.fancySelect = function(a) {
        var b, c;
        return c = $.extend({
            forceiOS: !1,
            parentClass: "parent-element"
        }, a), b = !!navigator.userAgent.match(/iP(hone|od|ad)/i), this.each(function() {
            function a(a) {
                a = void 0 !== a ? a : l.find(":selected").index() - 1, k.find("li.selected").removeClass("selected"), 
                k.find("li").eq(a + 1).addClass("selected");
            }
            function d() {
                return m.text(l.find(":selected").text());
            }
            function e(a) {
                var b = 0;
                return $(a).each(function(a, c) {
                    b = $(c).outerWidth(!0) > b ? $(c).outerWidth(!0) : b;
                }), b;
            }
            function f() {
                var a;
                k.addClass("measure"), a = e(k.find("li")), a = m.outerWidth() > a ? a : a + 46, 
                k.css("width", "auto"), k.css("min-width", m.outerWidth()), m.offset().top + m.outerHeight() + k.outerHeight() - $(window).scrollTop() + 20 > $(window).height() ? (k.addClass("overflowing"), 
                k.css({
                    top: m.offset().top - k.outerHeight()
                })) : (k.removeClass("overflowing"), k.css({
                    top: m.offset().top + m.outerHeight()
                })), m.offset().left + m.outerWidth() + k.outerWidth() - $(window).scrollLeft() + 20 > $(window).width() ? (k.addClass("alignRight"), 
                k.css({
                    left: m.offset().left + m.outerWidth() - k.outerWidth()
                })) : (k.removeClass("alignRight"), k.css({
                    left: m.offset().left
                })), k.removeClass("measure");
            }
            function g() {
                $(document.body).on("mousedown.fancyselect", function(a) {
                    var b = $(a.target);
                    b.hasClass("fancy-select") || 0 != b.closest(".fancy-select").size() || (m.trigger("close"), 
                    k.removeClass("open"), h());
                });
            }
            function h() {
                $(document.body).off("mousedown.fancyselect");
            }
            function i() {
                return d(), b && !c.forceiOS ? void l.find("option").each(function(a, b) {
                    b = $(b), (b.hasClass("parent-element") || b.hasClass("parent-cat")) && b.remove();
                }) : (l.find("option"), l.find("option").each(function(a, b) {
                    if (b = $(b), void 0 !== b.val() && !b.prop("disabled")) return k.append("<li class='" + (void 0 != b.attr("class") ? b.attr("class") : "") + "' data-value=\"" + b.val() + '">' + _.escape(b.text()) + "</li>");
                }));
            }
            var i, j, k, l, m, n, o;
            if (l = $(this), !(l.hasClass("no-fancy") && !0 !== c.force || (l.removeClass("no-fancy"), 
            l.hasClass("fancified") || "SELECT" !== l[0].tagName))) return l.addClass("fancified"), 
            l.css({
                width: 1,
                height: 1,
                display: "block",
                position: "absolute",
                top: 0,
                left: 0,
                opacity: 0
            }), l.wrap('<div class="fancy-select">'), n = l.parent(), n.addClass(l.data("class")), 
            n.append('<div class="trigger">'), k = $('<ul class="fancy-select options"></ul>'), 
            k.addClass(l.data("class")), b && !c.forceiOS || $("body").append(k), m = n.find(".trigger"), 
            j = l.prop("disabled"), j && n.addClass("disabled"), l.on("blur", function(a) {
                m.hasClass("open") && (o = setTimeout(function() {
                    m.trigger("close");
                }, 120));
            }), l.on("destroy", function() {
                k.remove();
            }), m.on("close", function(a) {
                m.removeClass("open");
            }), m.on("click", function() {
                if (!j) if (m.hasClass("open")) m.removeClass("open"), k.removeClass("open"), h(); else {
                    if (m.addClass("open"), b) return l.focus();
                    if (f(), k.addClass("open"), g(), !b) return l.focus();
                }
            }), l.on("enable", function() {
                return l.prop("disabled", !1), n.removeClass("disabled"), j = !1, i();
            }), l.on("disable", function() {
                return l.prop("disabled", !0), n.addClass("disabled"), j = !0;
            }), l.on("change", function(e) {
                if (e.originalEvent && !b) return e.preventDefault(), e.stopImmediatePropagation(), 
                e.stopPropagation();
                var f = l.find(":selected").attr("class");
                return void 0 != f && f.indexOf(c.parentClass) >= 0 ? (e.preventDefault(), e.stopImmediatePropagation(), 
                e.stopPropagation()) : (a(), d());
            }), n.on("keydown", function(a) {
                var b, c, d;
                if (d = a.which, b = k.find(".hover"), b.removeClass("hover"), k.hasClass("open")) {
                    if (38 === d) a.preventDefault(), b.length && b.index() > 0 ? b.prev().addClass("hover") : k.find("li:last-child").addClass("hover"); else if (40 === d) a.preventDefault(), 
                    b.length && b.index() < k.find("li").length - 1 ? b.next().addClass("hover") : k.find("li:first-child").addClass("hover"); else if (27 === d) a.preventDefault(), 
                    m.trigger("click"); else if (13 === d || 32 === d) a.preventDefault(), b.trigger("click"); else if (9 === d) m.hasClass("open") && m.trigger("close"); else if (d > 64 && d < 91) {
                        var e, f = new RegExp("^" + String.fromCharCode(d) + ".*?");
                        k.find("li").each(function(a, b) {
                            e || null == b.textContent.match(f) || (e = b);
                        }), $(e).addClass("hover");
                    }
                    if (c = k.find(".hover"), c.length) return k.scrollTop(0), k.scrollTop(c.position().top - 12);
                } else if (13 === d || 32 === d || 38 === d || 40 === d) return a.preventDefault(), 
                m.trigger("click");
            }), k.on("scroll", function(a) {
                a.stopPropagation(), o && clearTimeout(o);
            }), k.on("click", "li", function(a) {
                if ($(a.target).addClass("selected"), l.val($(a.target).data("value")).trigger("change"), 
                !b) return m.trigger("close"), k.removeClass("open"), h(), l.trigger("blur").trigger("focus");
            }), l.on("update", function(b) {
                return b.stopPropagation(), k.empty(), a(), i();
            }), i(), a(), $(this);
        });
    };
}).call(this);