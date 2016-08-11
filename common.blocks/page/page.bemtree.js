block('page').content()((node) => {
    return [
        { block: 'header' },
        { block: 'workspace', js: { sourceLang: node.data.sourceLang, targetLang: node.data.targetLang } }
    ];
});

block('page').mod('view', 'error').content()(() => ({ block: 'error' }));
