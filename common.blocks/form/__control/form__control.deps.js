([
    {
        mustDeps: [
            'i-bem-dom'
        ],

        shouldDeps: [
            {
                block: 'popup',
                mods: {
                    theme: 'islands',
                    target: 'anchor'
                }
            },
            {
                block: 'form',
                elem: 'control-message',
                mods: { theme: 'error', size: 's' }
            }
        ]
    },
    {
        tech: 'js',
        shouldDeps: [
            {
                tech: 'bemhtml',
                block: 'popup',
                mods: {
                    theme: 'islands',
                    target: 'anchor'
                }
            }
        ]
    }
]);
