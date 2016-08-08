block('alternative-translation')(
    content()(function(node) {
        const translations = node.data || [];

        return Array.isArray(translations) && translations.map(translation => {
            return {
                elem: 'translation',
                content: translation.target
            };
        });
    })
);
