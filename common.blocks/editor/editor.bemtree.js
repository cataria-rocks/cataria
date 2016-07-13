block('editor').content()((node) => {
    const segments = node.data.segments || [];

    return segments.map(segment => {
        return {
            elem: 'wrapper',
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
                        mix: { block: 'editor', elem: 'textarea' },
                        mods: { theme: 'islands', size: 'm', width: 'available' },
                        val: segment.target.content || ''
                    }
                },
                {
                    elem: 'status',
                    content: {
                        block: 'checkbox',
                        name: 'status',
                        val: false,
                        text: 'Проверено'
                    }
                }
            ]
        };
    });
});
