block('header').content()(function() {
    var block = this.block;

    return [
        {
            block: 'logo'
        },
        this.data.user ?
        {
            block: 'button',
            mix: { block: block, elem: 'button' },
            mods: { theme: 'islands', size: 'm', view: 'action', type: 'link' },
            text: 'Logout',
            url: '/logout'
        } : {
            block: 'button',
            mix: { block: block, elem: 'button' },
            mods: { theme: 'islands', size: 'm', view: 'action', type: 'link' },
            text: 'Login with GitHub',
            url: '/auth/github'
        }
    ];
});
