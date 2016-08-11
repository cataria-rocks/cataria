modules.define('editor', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

provide(BEMDOM.decl(this.name, {
    onFocusIn: function(e) {
        this._target = $(e.target).parents('.editor__unit');
        this.setMod(this._target, 'focused').emit('showAltTrans', e.target);
    },

    onFocusOut: function(e) {
        const elem = this.findBlockInside($(e.target), 'textarea');
        const index = elem.domElem.data('index');

        window.segments[index].target.content = elem.getVal();
        this.delMod(this._target, 'focused');
    },

    setStatus: function(e) {
        // TODO: $(e.target).parents('label') - ?
        const elem  = this.findBlockInside($(e.target).parents('label'), 'checkbox');
        const index = elem.domElem.data('index');

        window.segments[index].status = elem.getMod('checked');
        console.log('segment:', window.segments[index]);
    }
}, {
    live: function() {
        this.liveBindTo('target', 'focusin', this.prototype.onFocusIn)
            .liveBindTo('target', 'focusout', this.prototype.onFocusOut)
            .liveBindTo('status', 'change', this.prototype.setStatus);
    }
}));

});
