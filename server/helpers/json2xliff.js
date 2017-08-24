var EOL = require('os').EOL;

module.exports = function(jsonData) {
    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<xliff xmlns="urn:oasis:names:tc:xliff:document:1.2" version="1.2">',
     //   '  <file ' + (xliffData.markdownFileName ? 'original="' + xliffData.markdownFileName + '"' : ''),
     //   '    source-language="' + (xliffData.srcLang || 'ru') + '" target-language="' + (xliffData.trgLang || 'en') + '" datatype="markdown">',
        '    <header>'
        ].concat(
    [
        '    </header>',
        '    <body>'
    ], jsonData.map(function(unit) {
        return [
            '<trans-unit id="' + unit.id + '">',
            '  <source xml:lang="' + unit.sourceLang + '">' + (unit.source || '') + '</source>',
            '  <target xml:lang="' + unit.targetLang + '">' + (unit.target || '') + '</target>',
            '</trans-unit>'
        ].join(EOL);
    }), [
        '    </body>',
        ' </file>',
        '</xliff>'
    ]).join(EOL);
};
