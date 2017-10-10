block('editor').content()(node => {
    const segments = node.data.segments || [];

    return segments.map((segment, index) => {
        const status = segment.status;

        return {
            elem: 'unit',
            elemMods: { verified: status },
            content: [
                {
                    elem: 'source',
                    content: segment.source.content
                },
                {
                    elem: 'target',
                    mix: { block: 'editor', elem: 'textarea' },
                    attrs: { 'data-index': index, contenteditable: true },
                    content: segment.target.content || ''

                },
                {
                    block: 'checkbox',
                    mods: { theme: 'islands', size: 'm', checked: status },
                    mix: { block: 'editor', elem: 'status' },
                    attrs: { 'data-index': index },
                    name: 'status',
                    val: status
                }
            ]
        };
    }).concat({ block: 'segments' });
});
