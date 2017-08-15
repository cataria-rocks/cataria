var  creationdate = new Date().toISOString();

module.exports = function(jsonData) {
    if (!jsonData.length) return '';

    var srcLang = jsonData[0].sourceLang || 'en';
    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<tmx version="1.4">',
        '    <header',
        '        creationtool="cataria"',
        '        creationtoolversion="1.0.0"',
        '        segtype="sentence"',
        '        srcLang="' + srcLang + '"',
        '        creationdate="' + creationdate + '"',
        '    >',
        '    </header>',
        '    <body>',
        jsonData.map(function(unit) {
            return [
                '        <tu creationdate="' + (unit.date || creationdate) + '">',
                '            <tuv xml:lang="' + unit.sourceLang + '">',
                '                <seg>' + unit.source + '</seg>',
                '            </tuv>',
                '            <tuv xml:lang="' + unit.targetLang + '">',
                '                <seg>' + unit.target + '</seg>',
                '            </tuv>',
                '        </tu>'
            ].join('\n');
        }).join('\n'),
        '    </body>',
        '</tmx>'
    ].join('\n');
};
