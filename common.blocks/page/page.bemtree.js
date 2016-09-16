block('page').content()(node => {
    var data = node.data;

    return [
        { block: 'header' },
        { block: 'workspace', js: { sourceLang: data.sourceLang, targetLang: data.targetLang } }
    ];
});
