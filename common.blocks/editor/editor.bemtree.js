block('editor').content()((node) => {
    const segments = node.data.segments || [];

    return segments.map((segment, idx) => {
        const status = segment.status;

        return {
            elem: 'wrapper',
            elemMods: { verified: status },
            content: [
                {
                    elem: 'source',
                    content: [
                        {
                            tag: 'input',
                            attrs: {
                                type: 'hidden',
                                value: segment.source.content,
                                name: 'source_' + idx
                            }
                        },
                        segment.source.content
                    ]
                },
                {
                    elem: 'target',
                    content:
                    {
                        block: 'textarea',
                        mix: { block: 'editor', elem: 'textarea' },
                        mods: { theme: 'islands', size: 'm', width: 'available' },
                        val: segment.target.content || '',
                        name: 'target_' + idx
                    }
                },
                {
                    block: 'checkbox',
                    mix: { block: 'editor', elem: 'status' },
                    mods: { checked: (status && status !== 'off') },
                    name: 'status_' + idx,
                    val: 'on'
                }
            ]
        };
    });
});
