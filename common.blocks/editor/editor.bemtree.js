block('editor').content()(node => {
    const segments = node.data.segments || [];

    return segments.map((segment, index) => {
        const status = segment.status;

        return {
            block: 'editor-unit',
            mods: { verified: status },
            segment: segment,
            index: index

        };
    }).concat({ block: 'segments' });
});
