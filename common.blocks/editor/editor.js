modules.define('editor', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

provide(BEMDOM.decl(this.name, {
    _onFocus: function(e) {
        var target = $(e.target),
            source = this.elem('source').eq(target.index());

        this
            .toggleMod(target, 'focused')
            .toggleMod(source, 'focused');
    }
}, {
    live: function() {
        this.liveBindTo('target', 'focusin focusout', this.prototype._onFocus);
    }
}));

});
