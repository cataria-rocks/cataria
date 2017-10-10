block('main')(
    mod('view', 'blank').content()(node => {
        const block = node.block;

        return !node.data.user ? '' : {
            block: 'form',
            content: [
                {
                    block: 'heading',
                    content: 'Cataria'
                },
                [
                    {
                        block,
                        elem: 'item',
                        label: 'URL исходного документа',
                        name: 'doc',
                        placeholder: 'https://github.com/cataria-rocks/cataria/blob/master/README.md'
                    },
                    {
                        block,
                        elem: 'group',
                        content: [
                            {
                                elem: 'item',
                                elemMods: { column: 2 },
                                label: 'Язык исходного документа',
                                name: 'sourceLang',
                                placeholder: 'en'
                            },
                            {
                                elem: 'item',
                                elemMods: { column: 2 },
                                label: 'Язык перевода',
                                name: 'targetLang',
                                placeholder: 'ru'
                            }
                        ],
                    },
                    {   block,
                        elem: 'item',
                        label: 'Файл перевода',
                        name: 'target',
                        placeholder: 'README.ru.md'
                    }
                ],
                {
                    block: 'button',
                    mods: { theme: 'islands', size: 'm', type: 'submit', view: 'action' },
                    text: 'Перевести'
                }
            ]
        };
    }),

    elem('item').content()(function() {
        const ctx = this.ctx;

        return [
            {
                block: 'form',
                elem: 'label',
                content: ctx.label,
                'for': ctx.name
            },
            {
                block: 'input',
                mods: { theme: 'islands', size: 'm', width: 'available', 'has-clear': true },
                name: ctx.name,
                id: ctx.name,
                placeholder: ctx.placeholder
            }
        ];
    })
);
