!function(a, b) {
    "use strict";
    var c = resourceRoot + "typography/svg/svg-font.svg", d = 21;
    if (!b.createElementNS || !b.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect) return !0;
    var e, f, g = "localStorage" in a && null !== a.localStorage, h = function() {
        b.body.insertAdjacentHTML("afterbegin", f);
    }, i = function() {
        b.body ? h() : b.addEventListener("DOMContentLoaded", h);
    }, j = function(a) {
        return !(a.indexOf("html") > -1 || a.indexOf("body") > -1 || a.indexOf("div") > -1);
    };
    if (g && localStorage.getItem("inlineSVGrev") == d && (f = localStorage.getItem("inlineSVGdata")) && j(f)) return i(), 
    !0;
    try {
        e = new XMLHttpRequest(), e.open("GET", c, !0), e.onload = function() {
            e.status >= 200 && e.status < 400 && (f = e.responseText, i(), g && (localStorage.setItem("inlineSVGdata", f), 
            localStorage.setItem("inlineSVGrev", d)));
        }, e.send();
    } catch (a) {}
}(window, document);