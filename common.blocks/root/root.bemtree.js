block('root').replace()((node, ctx) => {
    const data = node.data = ctx.data || {};

    if (ctx.context) return ctx.context;

    return {
        block: 'page',
        title: data.title || 'xliff-editor',
        head: [
            { elem: 'css', url: 'index.min.css' }
        ],
        scripts: [
            { elem: 'js', url: 'index.min.js' }
        ],
        mods: { theme: 'islands', view: data.view }
    };
});
