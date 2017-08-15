block('alternative-translation')(
    content()(function() {
        const translations = applyNext() || [];

        return translations.map(translation => {
            return {
                elem: 'translation',
                elemMods: { bestMatch: translation.bestMatch },
                content: translation.target
            };
        });
    })
);
