block('editor-unit').content()((node, ctx) => {
    const status = ctx.segment.status;

    return [
        {
            elem: 'body',
            content: [
                {
                    elem: 'source',
                    mix: { elem: 'item' },
                    content: ctx.segment.source.content
                },
                {
                    elem: 'target',
                    mix: [
                        { elem: 'textarea' },
                        { elem: 'item' }
                    ],
                    attrs: { 'data-index': ctx.index, contenteditable: true },
                    content: ctx.segment.target.content || ''
                }
            ]
        },
        {
            block: 'checkbox',
            mods: { theme: 'islands', size: 'm', checked: status },
            mix: { block: 'editor-unit', elem: 'status' },
            attrs: { 'data-index': ctx.index },
            name: 'status',
            val: status,
            text: 'Verify'
        },
        {
            elem: 'footer',
            content: {
                block: 'alternative-translation',
            }
        }
    ];
});
