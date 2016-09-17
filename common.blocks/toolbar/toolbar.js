modules.define('toolbar', ['i-bem__dom'], function(provide, BEMDOM) {

provide(BEMDOM.decl(this.name, {
    _onButtonClick: function(e) {
        var action = e.target.getMod('toolbar-action');

        this.emit(action);
    }

}, {
    live: function() {
        this.liveInitOnBlockInsideEvent('click', 'button', this.prototype._onButtonClick);

    }
}));

});
