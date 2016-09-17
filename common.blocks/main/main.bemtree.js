block('main').content()(function() {
    var data = this.data;

    return { block: 'workspace', js: { sourceLang: data.sourceLang, targetLang: data.targetLang } };
});
