// block('main').mod('view', 'blank').content()(node => {
//     return !node.data.user ? { block: 'user' } : {
//         block: 'form',
//         content: [
//             {
//                 block: 'heading',
//                 content: 'Cataria'
//             },
//             [
//                 {
//                     label: 'URL исходного документа',
//                     name: 'doc',
//                     placeholder: 'https://github.com/cataria-rocks/cataria/blob/master/README.md'
//                 },
//                 {
//                     label: 'Язык исходного документа',
//                     name: 'sourceLang',
//                     placeholder: 'en'
//                 },
//                 {
//                     label: 'Файл перевода',
//                     name: 'target',
//                     placeholder: 'README.ru.md'
//                 },
//                 {
//                     label: 'Язык перевода',
//                     name: 'targetLang',
//                     placeholder: 'ru'
//                 }
//             ].map(input => [
//                 {
//                     elem: 'label',
//                     content: input.label,
//                     'for': input.name
//                 },
//                 {
//                     block: 'input',
//                     mods: { theme: 'islands', size: 'm', width: 'available', 'has-clear': true },
//                     name: input.name,
//                     id: input.name,
//                     placeholder: input.placeholder
//                 }
//             ]).concat({
//                 block: 'button',
//                 mods: { theme: 'islands', size: 'm', type: 'submit', view: 'action' },
//                 text: 'Перевести'
//             }).map(item => ({
//                 elem: 'item',
//                 content: item
//             }))
//         ]
//     };
// });

block('main')(
    mod('view', 'blank').content()(node => {
    const block = node.block;

    return !node.data.user ? { block: 'user' } : {
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
                        elem: 'flex-wrapper',
                        content: [
                            {
                                elem: 'item',
                                label: 'Язык исходного документа',
                                name: 'sourceLang',
                                placeholder: 'en'
                            },
                            {
                                block: 'logo',
                            },
                            {
                                elem: 'item',
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
