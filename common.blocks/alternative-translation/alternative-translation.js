modules.define('alternative-translation', ['i-bem__dom', 'jquery'], function(provide, BEMDOM) {

provide(BEMDOM.decl(this.name, {
    applyAltTrans: function(e) {
        this.emit('applyAltTrans', e.target);
    }
}, {
    live: function() {
        this.liveBindTo('translation', 'click', this.prototype.applyAltTrans);
    }
}));

});
