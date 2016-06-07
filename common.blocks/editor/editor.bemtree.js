block('editor').content()((node) => {
    const segments = node.data.segments;
    const sources = [];
    const targets = [];

    segments.forEach(segments => {
        sources.push({
            elem: 'source',
            content: segments.source
        });

        targets.push({
            elem: 'target',
            content: segments.target
        });
    });

    return [
        {
            elem: 'side',
            elemMods: { left: true },
            content: sources
        },
        {
            elem: 'side',
            elemMods: { right: true },
            content: targets
        }
    ];
});
