modules.define('panel', ['i-bem__dom'], function(provide, BEMDOM) {
provide(BEMDOM.decl(this.name, {
    onSetMod: {
        js: {
            inited: function() {}
        }
    },

    toggleVerified: function() {
        this.emit('toggleVerified');
    }

}, {
    live: function() {
        this.liveBindTo('toggle-verified', 'change', this.prototype.toggleVerified);
    }
}));

});
