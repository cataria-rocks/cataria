block('add-document-form')(
    js()(true),
    content()({
        block: 'form',
        content: [
            {
                block: 'heading',
                content: 'Add your document to translate it with Cataria'
            },
            {
                elem: 'item',
                mix: { block: 'form', elem: 'control', elemMods: { required: true, type: 'url' } },
                label: 'Source document URL',
                name: 'doc',
                placeholder: 'https://github.com/cataria-rocks/cataria/blob/master/README.md'
            },
            {
                elem: 'group',
                content: [
                    {
                        elem: 'item',
                        mix: { block: 'form', elem: 'control', elemMods: { required: true } },
                        elemMods: { column: 2 },
                        label: 'Original language',
                        name: 'sourceLang',
                        placeholder: 'en'
                    },
                    {
                        elem: 'item',
                        mix: { block: 'form', elem: 'control', elemMods: { required: true } },
                        elemMods: { column: 2 },
                        label: 'Target language',
                        name: 'targetLang',
                        placeholder: 'ru'
                    }
                ],
            },
            {
                elem: 'item',
                mix: { block: 'form', elem: 'control', elemMods: { required: true } },
                label: 'Target file',
                name: 'target',
                placeholder: 'README.ru.md'
            },
            {
                block: 'form',
                elem: 'validation-error',
                mix: { block: 'add-document-form', elem: 'validation-error' }
            },
            {
                elem: 'submit',
                content: {
                    block: 'button',
                    mods: { theme: 'islands', size: 'xl', type: 'submit', view: 'action' },
                    text: 'Translate'
                }
            }
        ].map(item => {
            item.block || (item.block = 'add-document-form');
            return item;
        })
    }),
    elem('item').content()(function() {
        const ctx = this.ctx;

        return [
            {
                block: 'form',
                elem: 'label',
                mix: { block: 'add-document-form', elem: 'label' },
                content: ctx.label,
                for: ctx.name
            },
            {
                block: 'input',
                mods: { theme: 'islands', size: 'l', width: 'available', 'has-clear': true },
                name: ctx.name,
                id: ctx.name,
                placeholder: ctx.placeholder
            }
        ];
    })
);
