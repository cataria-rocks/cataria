block('user').content()(function() {
    var user = this.data.user;

    return user ? [
        {
            block: 'image',
            mix: { block: 'user', elem: 'picture' },
            url: user.avatar
        },
        {
            elem: 'name',
            content: user.login
        },
        {
            block: 'button',
            mix: { block: 'toolbar', elem: 'button' },
            mods: { theme: 'islands', size: 'm', view: 'action', type: 'link' },
            text: 'Logout',
            url: '/logout'
        }
    ] : {
        block: 'button',
        mix: { block: 'toolbar', elem: 'button' },
        mods: { theme: 'islands', size: 'm', view: 'action', type: 'link' },
        text: 'Login with GitHub',
        url: '/auth/github'
    };
});
