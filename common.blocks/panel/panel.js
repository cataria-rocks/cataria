modules.define('panel', ['i-bem__dom'], function(provide, BEMDOM) {
provide(BEMDOM.decl(this.name, {
    toggleVerified: function() {
        this.emit('toggleVerified');
    }

}, {
    live: function() {
        this.liveBindTo('toggle-verified', 'change', this.prototype.toggleVerified);
    }
}));

});
