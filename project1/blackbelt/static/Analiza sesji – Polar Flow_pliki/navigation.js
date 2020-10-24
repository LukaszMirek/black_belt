Navigation = function() {
    this.width = window.innerWidth, this.isMobile = !1;
}, Navigation.prototype.load = function() {
    this.width <= 991 && !this.isMobile ? (this.isMobile = !0, this.createMobileMenu()) : this.width > 991 && this.isMobile && (this.isMobile = !1, 
    this.createDesktopMenu());
}, Navigation.prototype.getWidth = function() {
    return this.width;
}, Navigation.prototype.setWidth = function(a) {
    this.width = a;
}, Navigation.prototype.isMobile = function() {
    return this.isMobile;
}, Navigation.prototype.createMobileMenu = function() {
    $(".user-profile-links").appendTo(".main-nav__usermenu--mobile"), $(".user-profile-links").removeClass("dropdown-menu dropdown-menu-right"), 
    $(".main-nav__user-dropdown").removeClass("dropdown"), $(".main-nav__user-dropdown > a").attr("data-toggle", ""), 
    $(".global-nav__list").appendTo(".main-nav__mobile-global-holder"), $(".main-nav__user-dropdown").hasClass("active") && $(".main-nav__usermenu--mobile").addClass("active"), 
    $("footer.footer").appendTo(".main-nav__menuholder");
}, Navigation.prototype.createDesktopMenu = function() {
    $(".user-profile-links").appendTo(".main-nav__user-dropdown"), $(".user-profile-links").addClass("dropdown-menu dropdown-menu-right"), 
    $(".main-nav__user-dropdown").addClass("dropdown"), $(".main-nav__user-dropdown > a").attr("data-toggle", "dropdown"), 
    $(".global-nav__list").appendTo(".global-nav"), $("body").removeClass("nav-open"), 
    $("footer.footer").appendTo(".wrapper");
}, $(document).ready(function() {
    var a = new Navigation();
    a.load(), $(window).resize(function() {
        window.innerWidth != a.getWidth() && (a.setWidth(window.innerWidth), setTimeout(function() {
            a.load();
        }, 300));
    }), $(window).scroll(function() {
        var b = $(window).scrollTop();
        a.isMobile || $(".global-nav").css("margin-top", b > 30 ? -30 : 0 - b);
    });
});