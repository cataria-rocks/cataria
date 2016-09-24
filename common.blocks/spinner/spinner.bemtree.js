block('spinner')(
    content()(function() {
        return {
            block: 'spin',
            mix: { block: 'spinner', elem: 'spin' },
            mods: { theme: 'islands', size: 'xl', visible: true }
        };
    })
);
