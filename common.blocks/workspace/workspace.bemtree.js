block('workspace')(
    content()(function() {
        return [
            {
                elem: 'centerblock',
                content: [
                    { block: 'panel' },
                    { block: 'editor' }
                ]
            },
            { block: 'toolbar' },
            { block: 'spinner' }
        ];
    })
);
