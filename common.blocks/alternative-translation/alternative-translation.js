modules.define('alternative-translation', ['i-bem-dom', 'jquery'], function(provide, bemDom, $) {

provide(bemDom.declBlock(this.name, {
    applyAltTrans: function(e) {
        var elem = $(e.target).hasClass('alternative-translation__translation') ?
            e.target : e.target.parentNode;

        this._emit('applyAltTrans', elem);
    }
}, {
    lazyInit: true,
    onInit: function() {
        this._domEvents('translation').on('click', this.prototype.applyAltTrans);
    }
}));

});
