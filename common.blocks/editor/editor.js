modules.define('editor', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

provide(BEMDOM.decl(this.name, {
    _onFocus: function(e) {
        var target = $(e.target).parents('.editor__wrapper'), // TODO
            source = this.elem('source').eq(target.index());

        this
            .toggleMod(target, 'focused')
            .toggleMod(source, 'focused');
    },
    provideData: function(options = {}) {
        const items = this.domElem.serializeArray();
        const onlyTranslated = options.onlyTranslated === undefined ? true : options.onlyTranslated;
        const data = [];
        // items is flat ordered array of form data
        // take every 3 items and got every item of data
        for (let i = 0; i < items.length; i += 3) {
            const source = items[i].value;
            const target = items[i + 1].value;
            const status = items[i + 2].value;

            (!onlyTranslated || target) && data.push({
                target: target.trim(),
                target_lang: 'en-US',
                source: source,
                source_lang: 'ru-RU',
                status: status
            });
        }
        return data;
    }
}, {
    live: function() {
        this.liveBindTo('target', 'focusin focusout', this.prototype._onFocus);
    }
}));
});
