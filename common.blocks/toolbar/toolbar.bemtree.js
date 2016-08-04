block('toolbar').content()(function() {
    return [
        {
            block: 'alternative-translation'
        },
        {
            elem: 'buttons',
            content: [
                {
                    block: 'button',
                    mods: { theme: 'islands', size: 'm', 'toolbar-action': 'getTM' },
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
                    mods: { theme: 'islands', size: 'm', 'toolbar-action': 'saveTm' },
                    mix: { block: 'toolbar', elem: 'action' },
                    type: 'submit',
                    text: 'Save'
                },
                {
                    block: 'button',
                    mods: { theme: 'islands', size: 'm', 'toolbar-action': 'sendPR' },
                    mix: { block: 'toolbar', elem: 'action' },
                    type: 'submit',
                    text: 'Send PR to GitHub'
                }
            ]
        }
    ];
});
