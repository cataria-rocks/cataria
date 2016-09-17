({
    shouldDeps: [
        {
            mods: {
                view: ['blank', 'error']
            }
        },
        'workspace', 'panel', 'error', 'form',
        {
            block: 'input',
            mods: { theme: 'islands', size: 'm' }
        },
        {
            block: 'button',
            mods: { theme: 'islands', size: 'm', type: 'submit', view: 'action' }
        }
    ]
})
