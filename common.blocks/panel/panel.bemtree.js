block('panel').content()((node) => {
    const data = node.data;

    return [
        {
            elem: 'side',
            mix: { block: 'editor', elem: 'side', elemMods: { left: true } },
            content: 'Text in the original language: ' + data.sourceLang
        },
        {
            elem: 'side',
            mix: { block: 'editor', elem: 'side', elemMods: { right: true } },
            content: 'Text in the target language: ' + data.targetLang
        }
    ];
});
