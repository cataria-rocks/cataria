block('page').content()(() => {
    return [
        'header', 'panel', 'workspace'
    ].map(block => ({ block: block }));
});
