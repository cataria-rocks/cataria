block('spiner')(
    content()(function() {
        return {
            block: 'spin',
            mix: { block: 'spiner', elem: 'spin' },
            mods: { theme: 'islands', size: 'xl', visible: true }
        };
    })
);
