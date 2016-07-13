block('panel').content()((node) => {
    const data = node.data;

    return [
        {
            elem: 'side',
            mix: { block: 'editor', elem: 'source' },
            content: 'Text in the original language: ' + data.sourceLang
        },
        {
            elem: 'side',
            mix: { block: 'editor', elem: 'source' },
            content: 'Text in the target language: ' + data.targetLang
        },
        {
            elem: 'side',
            mix: { block: 'editor', elem: 'status' },
            content: 'Status'
        }
    ];
});
