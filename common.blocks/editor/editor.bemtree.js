block('editor').content()(node => {
    const helpers = require('../../server/helpers/markup-helper.js');
    const segments = node.data.segments || [];

    return segments.map((segment, index) => {
        const status = segment.status;

        return {
            elem: 'unit',
            elemMods: { verified: status },
            content: [
                {
                    elem: 'source',
                    content: helpers.createTags(segment.source.content)
                },
                {
                    elem: 'target',
                    content: helpers.createTags(segment.target.content || ''),
                    attrs: { 'data-index': index, contenteditable: true },
                    mix: { block: 'editor', elem: 'textarea' }
                },
                {
                    block: 'checkbox',
                    attrs: { 'data-index': index },
                    mix: { block: 'editor', elem: 'status' },
                    mods: { theme: 'islands', size: 'm', checked: status },
                    name: 'status',
                    val: status
                }
            ]
        };
    }).concat({ block: 'segments' });
});
