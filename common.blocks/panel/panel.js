modules.define('panel', ['i-bem-dom'], function(provide, bemDom) {

    provide(bemDom.declBlock(this.name, {
        toggleVerified: function() {
            this._emit('toggleVerified');
        }

    }, {
        lazyInit: true,
        onInit: function() {
            this._domEvents('toggle-verified').on('change', this.prototype.toggleVerified);
        }
    }));

});
