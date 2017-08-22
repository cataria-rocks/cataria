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
            mods: { theme: 'islands', size: 'm', view: 'action', type: 'link' },
            mix: { block: 'toolbar', elem: 'button' },
            text: 'Logout',
            url: '/logout'
        }
    ] : {
        block: 'button',
        mods: { theme: 'islands', size: 'm', view: 'action', type: 'link' },
        mix: { block: 'toolbar', elem: 'button' },
        text: 'Login with GitHub',
        url: '/auth/github'
    };
});
