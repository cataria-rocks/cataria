block('page').content()(function() {
    return [].concat(applyNext(), {
        block: 'info-modal'
    });
});

block('info-modal')(
    js()(true),
    content()({
        block: 'modal',
        mods: { autoclosable: true, theme: 'islands' }
    })
);
