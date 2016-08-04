modules.define('toolbar', ['i-bem__dom'], function(provide, BEMDOM) {

provide(BEMDOM.decl(this.name, {
    onSetMod: {
        js: {
            inited: function() {}
        }
    },

    _onButtonClick: function(e) {
        const action = e.target.getMod('toolbar-action');

        this.emit(action);
    }

}, {
    live: function() {
        this.liveInitOnBlockInsideEvent('click', 'button', this.prototype._onButtonClick);

    }
}));

});
