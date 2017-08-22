block('page').content()(function() {
    return [].concat(applyNext(), {
        block: 'info-modal'
    });
});

block('info-modal')(
    addJs()(true),
    content()({
        block: 'modal',
        mods: { autoclosable: true, theme: 'islands' }
    })
);
