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
                    content:
                    {
                        block: 'textarea',
                        attrs: { 'data-index': index },
                        mix: { block: 'editor', elem: 'textarea' },
                        mods: { theme: 'islands', size: 'm', width: 'available' },
                        val: segment.target.content || ''
                    }
                },
                {
                    block: 'checkbox',
                    mix: { block: 'editor', elem: 'status' },
                    mods: { checked: status },
                    name: 'status',
                    val: status
                }
            ]
        };
    }).concat({ block: 'segments' });
});
