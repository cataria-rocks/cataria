modules.define('toolbar', ['i-bem-dom', 'button'], function(provide, bemDom, Button) {

provide(bemDom.declBlock(this.name, {
    _onButtonClick: function(e) {
        var action = e.bemTarget.getMod('toolbar-action');

        this._emit(action);
    }

}, {
    lazyInit: true,
    onInit: function() {
        this._events(Button).on('click', this.prototype._onButtonClick);
    }
}));

});
