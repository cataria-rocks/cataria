block('editor').content()(function() {
    var data = this.ctx.data,
        sources = [], targets = [];

    data.forEach(function(item) {
        sources.push({
            elem: 'source-text',
            content: item.source
        });

        targets.push({
            elem: 'target-text',
            content: item.target
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
