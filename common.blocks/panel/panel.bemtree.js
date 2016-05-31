block('panel').content()(function() {
    var lang = this.ctx.data;

    return [
        {
            elem: 'side',
            mix: { block: 'editor', elem: 'side', elemMods: { left: true } },
            content: 'Text in the original language: ' + lang.source
        },
        {
            elem: 'side',
            mix: { block: 'editor', elem: 'side', elemMods: { right: true } },
            content: 'Text in the target language: ' + lang.target
        }
    ];
});
