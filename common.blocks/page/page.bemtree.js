block('page').content()(function() {
    var data = JSON.parse(require('fs').readFileSync('stub/stub.json')),
        lang = data[0],
        content = data.splice(0,1);

    return [
        {
            block: 'header'
        },
        {
            block: 'panel',
            data: lang
        },
        {
            block: 'editor',
            data: content
        },
        {
            block: 'tool-bar'
        }
    ];
});
