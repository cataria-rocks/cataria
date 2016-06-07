block('toolbar').content()(function() {
    return [
        {
            block: 'button',
            mods: { theme: 'islands', size: 'm' },
            mix: { block: 'toolbar', elem: 'button' },
            type: 'submit',
            text: 'Save'
        }
    ];
});
