block('tool-bar').content()(function() {
    return [
        {
            block: 'button',
            mix: { block: 'tool-bar', elem: 'button' },
            type: 'submit',
            content: 'Save'
        }
    ];
});
