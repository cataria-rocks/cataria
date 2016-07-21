block('toolbar').content()(function() {
    return [
        {
            block: 'button',
            mods: { theme: 'islands', size: 'm', 'toolbar-action': 'memory' },
            mix: { block: 'toolbar', elem: 'action' },
            type: 'submit',
            text: 'Apply translation memory'
        },
        {
            block: 'button',
            mods: { theme: 'islands', size: 'm', 'toolbar-action': 'translate' },
            mix: { block: 'toolbar', elem: 'action' },
            type: 'submit',
            text: 'Translate via Yandex Translate'
        },
        {
            block: 'button',
            mods: { theme: 'islands', size: 'm', 'toolbar-action': 'save' },
            mix: { block: 'toolbar', elem: 'action' },
            type: 'submit',
            text: 'Save'
        },
        {
            block: 'button',
            mods: { theme: 'islands', size: 'm', 'toolbar-action': 'send' },
            mix: { block: 'toolbar', elem: 'action' },
            type: 'submit',
            text: 'Send PR to GitHub'
        }
    ];
});
