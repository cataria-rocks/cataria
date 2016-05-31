modules.define('editor', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

    provide(BEMDOM.decl(this.name, {
        _onFocusBlur: function(e) {
            var target = $(e.target),
                source = $('.editor__source-text')[target.index()];

            this.toggleMod(target, 'focused')
                .toggleMod($(source), 'focused');
        }
    }, {
        live: function() {
            this.liveBindTo('target-text', 'focusin', this.prototype._onFocusBlur)
                .liveBindTo('target-text', 'focusout', this.prototype._onFocusBlur);
        }
    }));

});
