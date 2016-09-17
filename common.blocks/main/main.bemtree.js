block('main').content()(node => {
    const data = node.data;

    return {
        block: 'workspace',
        mods: { mode: 'unverified-only' },
        js: {
            sourceLang: data.sourceLang,
            targetLang: data.targetLang
        }
    };
});
