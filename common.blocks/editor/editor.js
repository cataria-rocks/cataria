modules.define('editor', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

provide(BEMDOM.decl(this.name, {
    _onFocus: function(e) {
        // TODO: убрать это!!!
        var target = $(e.target.parentElement.parentElement),
            source = this.elem('source').eq(target.index());

        this
            .toggleMod(target, 'focused')
            .toggleMod(source, 'focused');
    },
    provideData: function() {
        const items = this.elem('wrapper');
        const _this = this;

        let data = [];

        items.each((index, item) => {
            const jqueryItem = $(item);
            const source = _this.findElem(jqueryItem, 'source').text();
            const target = _this.findBlockInside(jqueryItem, 'textarea').getVal();
            const status = _this.findBlockInside(jqueryItem, 'checkbox').getMod('checked');

            target.length && status && data.push({
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
        this.liveBindTo('target', 'focusin focusout', this.prototype._onFocus);
    }
}));
});
