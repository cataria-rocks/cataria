block('page').content()((node) => {
    return [
        { block: 'header' },
        { block: 'workspace', js: { sourceLang: node.data.sourceLang, targetLang: node.data.targetLang } }
    ];
});

block('page').mod('view', 'blank').content()(() => {
    return {
        block: 'form',
        content: [
            {
                block: 'input',
                mods: { theme: 'islands', size: 'm', width: 'available', 'has-clear': true },
                name: 'doc',
                placeholder: 'URL исходного документа'
            },
            {
                block: 'input',
                mods: { theme: 'islands', size: 'm', width: 'available', 'has-clear': true },
                name: 'target',
                placeholder: 'Язык исходного документа'
            },
            {
                block: 'input',
                mods: { theme: 'islands', size: 'm', width: 'available', 'has-clear': true },
                name: 'target',
                placeholder: 'Язык перевода'
            },
            {
                block: 'button',
                mods: { theme: 'islands', size: 'm', type: 'submit', view: 'action' },
                text: 'Перевести'
            }
        ].map(item => ({
            elem: 'item',
            content: item
        }))
    };
});

block('page').mod('view', 'error').content()(() => ({ block: 'error' }));
