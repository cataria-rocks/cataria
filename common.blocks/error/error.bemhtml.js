block('error')(
    js()(true),
    tag()('span'),
    content()({
        block: 'popup',
        mods: { autoclosable: true, error: true, target: 'anchor', theme: 'islands' },
        directions: ['right-center'],
        mainOffset: 10
    })
);
