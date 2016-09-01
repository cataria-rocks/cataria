modules.define('alternative-translation', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

provide(BEMDOM.decl(this.name, {
    applyAltTrans: function(e) {
        var elem = $(e.target).hasClass('alternative-translation__translation') ?
            e.target : e.target.parentNode;

        this.emit('applyAltTrans', elem);
    }
}, {
    live: function() {
        this.liveBindTo('translation', 'click', this.prototype.applyAltTrans);
    }
}));

});
