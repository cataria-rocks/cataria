modules.define('editor', ['i-bem-dom', 'editor-unit'], function(provide, bemDom, EditorUnit) {

provide(bemDom.declBlock(this.name, {
    _onFocusChange: function(e, currUnit) {
        this.findChildBlocks(EditorUnit).forEach( unit => unit.delMod('focused'));
        currUnit.setMod('focused');
    }
}, {
    lazyInit: true,
    onInit: function() {
        this._events(EditorUnit).on('focusChange', this.prototype._onFocusChange);
    }
}));
});
