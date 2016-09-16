block('page').mod('view', 'blank').content()(() => {
    return {
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
                    placeholder: 'https://github.com/bem-site/cataria/blob/master/README.md'
                },
                {
                    label: 'Язык исходного документа',
                    name: 'sourceLang',
                    placeholder: 'Язык исходного документа'
                },
                {
                    label: 'Файл перевода',
                    name: 'target',
                    placeholder: 'Файл перевода'
                },
                {
                    label: 'Язык перевода',
                    name: 'targetLang',
                    placeholder: 'Язык перевода'
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
