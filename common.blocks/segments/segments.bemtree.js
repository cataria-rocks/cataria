block('segments').def()(node => {
    const segments = node.data.segments || [];

    node.ctx.segments = segments.map(segment => {
        if (Array.isArray(segment.altTrans)) {
            segment.altTrans = applyCtx({
                block: 'alternative-translation',
                content: segment.altTrans
            });
        }

        return segment;
    });

    return applyNext();
});
