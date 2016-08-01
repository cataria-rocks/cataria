block('alternative-translation')(
    content()(function(node) {
        const translations = node.data.translations || [];

        return translations.map(translation => {
            return {
                elem: 'translation',
                content: translation.target
            };
        });
    })
);
