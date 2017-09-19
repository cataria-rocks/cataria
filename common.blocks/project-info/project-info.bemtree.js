block('project-info').content()([
    {
        elem: 'content',
        content: [
            {
                elem: 'title',
                content: 'Title'
            },
            {
                elem: 'description',
                content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            {
                block: 'button',
                mods: { theme: 'islands', size: 'xl', view: 'action', type: 'link' },
                text: 'Login with GitHub',
                url: '/auth/github'
            }
        ]
    }
]);
