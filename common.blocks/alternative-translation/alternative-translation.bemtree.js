block('alternative-translation')(
    content()(function() {
        const translations = applyNext() || [];

        return translations.length > 0 ? translations.map(translation => {
            return {
                elem: 'translation',
                content: translation.target
            };
        }) :  [
            'Download translation memory',
            {
                block: 'button',
                mods: { theme: 'islands', size: 'm', 'toolbar-action': 'getTM' },
                mix: { block: 'toolbar', elem: 'action' },
                type: 'submit',
                text: 'Download'
            }
        ];
    })
);
