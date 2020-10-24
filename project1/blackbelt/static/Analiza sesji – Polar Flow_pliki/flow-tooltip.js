var Flowtooltip = function(a) {
    this.options = a, this.init();
};

Flowtooltip.prototype.init = function() {
    var a = this, b = this.options, c = document.querySelectorAll(b.el);
    [].forEach.call(c, function(c) {
        var d = [ b.pos, b.classes ].join(" ");
        d += "popover" === b.type ? " flow-popover" : "";
        var e = document.createElement("div");
        e.className = "flow-tooltip " + d;
        var f = document.createElement("div");
        f.className = "flow-tooltip-content";
        var g = document.createElement("span");
        g.className = "flow-tooltip-arrow", e.appendChild(f), e.appendChild(g);
        var h = c.querySelector(".flow-tooltip");
        h && h.parentNode.removeChild(h), 0 === $(c).find(".flow-tooltip").length && c.appendChild(e);
        var i = c.querySelector(".flow-tooltip-content");
        if (void 0 !== b.type && "popover" === b.type) {
            var j = document.createElement("div");
            j.className = "flow-tooltip-content-holder", b.content.forEach(function(b, c) {
                b.getContent;
                var d = a.createView(b.content, b.id);
                j.appendChild(d);
            }), i.appendChild(j), a.setActiveView(c), a.setDimensions(c), a.hideExtraViews(c);
        } else {
            var k = c.getAttribute("data-tooltip");
            i.innerHTML = k;
        }
        a.centerTooltip(c), handler = void 0 !== b.handler ? c.querySelector(b.handler) : c, 
        void 0 !== b.trigger && "click" === b.trigger ? a.clickEvents(c, handler) : a.hover(c, handler);
    });
}, Flowtooltip.prototype.centerTooltip = function(a) {
    var b = null != a ? a.querySelector(".flow-tooltip") : null;
    null !== b && (width = a.clientWidth / 2 - b.clientWidth / 2, b.style.left = width + "px");
}, Flowtooltip.prototype.createView = function(a, b) {
    var c = b || "", d = document.createElement("div");
    return d.className = "flow-tooltip__view", d.setAttribute("data-content-id", c), 
    d.innerHTML = a, d;
}, Flowtooltip.prototype.hover = function(a, b) {
    var c = this, d = document.querySelectorAll(this.options.el);
    [].forEach.call(d, function(a) {
        a.addEventListener("mouseover", function(b) {
            c.centerTooltip(a), this.setAttribute("role", "tooltip");
        }), a.addEventListener("mouseout", function(a) {
            this.removeAttribute("role");
        });
    });
}, Flowtooltip.prototype.clickEvents = function(a, b) {
    var c = this;
    b.addEventListener("click", function(b) {
        b.preventDefault(), b.stopPropagation(), a.getAttribute("role") ? a.removeAttribute("role") : a.setAttribute("role", "tooltip");
    }), a.querySelector(".flow-tooltip, .flow-tooltip-content-holder, .flow-tooltip__view").addEventListener("click", function(a) {
        a.preventDefault(), a.stopPropagation();
    });
    var d = a.querySelectorAll("a[data-content-id]");
    [].forEach.call(d, function(b) {
        b.addEventListener("click", function(b) {
            b.preventDefault(), b.stopPropagation();
            var d = this.getAttribute("data-content-id");
            c.moveToView(a, d);
        });
    });
    var e = a.querySelectorAll(".popover__back-to-menu");
    [].forEach.call(e, function(b) {
        b.addEventListener("click", function(b) {
            b.preventDefault(), b.stopPropagation(), c.setActiveView(a), c.moveToView(a);
        });
    });
}, Flowtooltip.prototype.setDimensions = function(a) {
    var b = this, c = b.getActiveView(a), d = c.offsetWidth, e = c.offsetHeight, f = 0, g = 0, h = a.querySelector(".flow-tooltip"), i = a.querySelectorAll(".flow-tooltip__view");
    [].forEach.call(i, function(a) {
        f += a.offsetWidth, g = Math.max(g, a.offsetHeight);
    }), h.style.width = d + "px", h.style.height = e + "px";
    var j = h.querySelector(".flow-tooltip-content");
    j.style.width = d + "px", j.style.height = e + "px";
    var k = h.querySelector(".flow-tooltip-content-holder");
    k.style.width = f + 10 + "px", k.style.height = g + "px";
    var l = h.querySelector(".flow-tooltip__view.is-active .tooltip__header"), m = h.querySelector(".flow-tooltip__view.is-active .flow-tooltip__view-wrapper");
    l && m && (m.style.height = e - l.offsetHeight + "px"), this.centerTooltip(a);
}, Flowtooltip.prototype.getActiveView = function(a) {
    return a.querySelector(".flow-tooltip__view.is-active") ? a.querySelector(".flow-tooltip__view.is-active") : a.querySelectorAll(".flow-tooltip__view")[0];
}, Flowtooltip.prototype.setActiveView = function(a, b) {
    var c = a.querySelector(".flow-tooltip"), d = a.querySelectorAll(".flow-tooltip__view");
    if (this.removeActiveClasses(d), void 0 === b) d[0].className = d[0].className + " is-active", 
    c.className = c.className.replace(/\b has-highlighted-arrow\b/, ""); else {
        var e = c.querySelector('.flow-tooltip__view[data-content-id="' + b + '"]');
        e.className = e.className + " is-active", e.querySelector(".flow-tooltip__header") ? c.className = c.className + " has-highlighted-arrow" : c.className = c.className.replace(/\b has-highlighted-arrow\b/, "");
    }
}, Flowtooltip.prototype.removeActiveClasses = function(a) {
    [].forEach.call(a, function(a) {
        a.className = a.className.replace(/\b is-active\b/, "");
    });
}, Flowtooltip.prototype.moveToView = function(a, b) {
    var c = this, d = a.querySelectorAll(".flow-tooltip__view"), e = a.querySelector('.flow-tooltip__view[data-content-id="' + b + '"]') ? a.querySelector('.flow-tooltip__view[data-content-id="' + b + '"]') : a.querySelectorAll(".flow-tooltip__view")[0], f = (this.getActiveView(a), 
    Array.prototype.slice.call(a.querySelector(".flow-tooltip-content-holder").children));
    a.querySelector('.flow-tooltip__view:not([data-content-id="' + b + '"])');
    this.removeActiveClasses(d), e.className = e.className.replace(/\b hidden\b/, ""), 
    this.setActiveView(a, b), pos = -1 * e.offsetLeft, a.querySelector(".flow-tooltip-content-holder").style.left = pos + "px", 
    0 === f.indexOf(e) && setTimeout(function() {
        c.hideViews(d, e);
    }, 200), this.setDimensions(a);
}, Flowtooltip.prototype.hideViews = function(a, b) {
    [].forEach.call(a, function(a) {
        a === b || a.className.match(/\bhidden\b/) || (a.className = a.className + " hidden");
    });
}, Flowtooltip.prototype.hideExtraViews = function(a) {
    var b = a.querySelectorAll(".flow-tooltip__view");
    [].forEach.call(b, function(a, b) {
        0 === b || a.className.match(/\bhidden\b/) || (a.className = a.className + " hidden");
    });
};