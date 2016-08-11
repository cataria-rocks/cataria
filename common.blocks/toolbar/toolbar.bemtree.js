block('toolbar').content()(function() {
    return [
        this.data.user ?
        {
            block: 'button',
            mix: { block: 'toolbar', elem: 'button' },
            mods: { theme: 'islands', size: 'm', view: 'action', type: 'link' },
            text: 'Logout',
            url: '/logout'
        } : {
            block: 'button',
            mix: { block: 'toolbar', elem: 'button' },
            mods: { theme: 'islands', size: 'm', view: 'action', type: 'link' },
            text: 'Login with GitHub',
            url: '/auth/github'
        },
        {
            block: 'alternative-translation'
        },
        {
            elem: 'buttons',
            content: [
                {
                    block: 'button',
                    mods: { theme: 'islands', size: 'm', 'toolbar-action': 'updateTM' },
                    mix: { block: 'toolbar', elem: 'action' },
                    type: 'submit',
                    text: 'Update TM'
                },
                {
                    block: 'button',
                    mods: { theme: 'islands', size: 'm', 'toolbar-action': 'saveTm' },
                    mix: { block: 'toolbar', elem: 'action' },
                    type: 'submit',
                    text: 'Save TM'
                },
                {
                    block: 'button',
                    mods: { theme: 'islands', size: 'm', 'toolbar-action': 'translate' },
                    mix: { block: 'toolbar', elem: 'action' },
                    type: 'submit',
                    text: 'Translate'
                },
                {
                    block: 'button',
                    mods: { theme: 'islands', size: 'm', 'toolbar-action': 'sendPR' },
                    mix: { block: 'toolbar', elem: 'action' },
                    type: 'submit',
                    text: 'Send PR'
                }
            ]
        }
    ];
});
