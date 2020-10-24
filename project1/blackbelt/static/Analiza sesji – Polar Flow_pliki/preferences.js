var LocalPreferences = function() {
    function a() {
        this.storage = localStorage, this.serializer = JSON;
    }
    return a.prototype = {
        get: function(a, b) {
            var c = this.storage.getItem(a);
            return null == c ? void 0 !== b ? b : null : this.serializer.parse(c);
        },
        set: function(a, b) {
            return this.storage.setItem(a, this.serializer.stringify(b)), this;
        },
        has: function(a) {
            return null != this.storage.getItem(a);
        },
        remove: function(a) {
            return this.storage.removeItem(a), this;
        },
        clear: function() {
            return this.storage.clear(), this;
        },
        keys: function() {
            return Object.keys(localStorage);
        }
    }, new a();
}();