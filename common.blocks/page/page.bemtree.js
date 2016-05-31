block('page').content()(() => {
    return [
        'header', 'panel', 'editor', 'toolbar'
    ].map(block => ({ block: block }));
});
