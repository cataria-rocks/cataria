modules.define('editor', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

provide(BEMDOM.decl(this.name, {
    _onFocusIn: function(e) {
        this._target = $(e.target).parents('.editor__unit');
        this._source = this.elem('source').eq(this._target.index());

        this
            .setMod(this._target, 'focused')
            .setMod(this._source, 'focused')
            .emit('showAltTrans', { search: this._source.text(), unit: e.target });
    },

    _onFocusOut: function() {
        this
            .delMod(this._target, 'focused')
            .delMod(this._source, 'focused');
    },

    provideData: function() {
        const items = this.elem('unit');
        const _this = this;

        let data = [];

        items.each((index, item) => {
            const jqueryItem = $(item);
            const source = _this.findElem(jqueryItem, 'source').text();
            const target = _this.findBlockInside(jqueryItem, 'textarea').getVal();
            const status = _this.findBlockInside(jqueryItem, 'checkbox').getMod('checked');

            target.length && data.push({
                target: target,
                target_lang: 'en-US',
                source: source,
                source_lang: 'ru-RU',
                status: status
            });
        });

        return data;
    }
}, {
    live: function() {
        this.liveBindTo('target', 'focusin', this.prototype._onFocusIn);
        this.liveBindTo('target', 'focusout', this.prototype._onFocusOut);
    }
}));

});
