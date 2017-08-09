block('main').mod('view', 'blank').content()(node => {
    return !node.data.user ? { block: 'user' } : {
        block: 'form',
        content: [
            {
                block: 'heading',
                content: 'Cataria'
            },
            [
                {
                    label: 'URL исходного документа',
                    name: 'doc',
                    placeholder: 'https://github.com/cataria-rocks/cataria/blob/master/README.md'
                },
                {
                    label: 'Язык исходного документа',
                    name: 'sourceLang',
                    placeholder: 'en'
                },
                {
                    label: 'Файл перевода',
                    name: 'target',
                    placeholder: 'README.ru.md'
                },
                {
                    label: 'Язык перевода',
                    name: 'targetLang',
                    placeholder: 'ru'
                }
            ].map(input => [
                {
                    elem: 'label',
                    content: input.label,
                    'for': input.name
                },
                {
                    block: 'input',
                    mods: { theme: 'islands', size: 'm', width: 'available', 'has-clear': true },
                    name: input.name,
                    id: input.name,
                    placeholder: input.placeholder
                }
            ]).concat({
                block: 'button',
                mods: { theme: 'islands', size: 'm', type: 'submit', view: 'action' },
                text: 'Перевести'
            }).map(item => ({
                elem: 'item',
                content: item
            }))
        ]
    };
});
