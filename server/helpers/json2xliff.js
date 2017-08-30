var EOL = require('os').EOL;

module.exports = function( sourceLang, targetLang, jsonData) {
        return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<xliff xmlns="urn:oasis:names:tc:xliff:document:1.2" version="1.2">',
        '  <file original = "cataria.xliff" ',
        '    source-language="' + (sourceLang) + '" target-language="' + (targetLang) + '" datatype="markdown">',
        '    <header>'
        ].concat(
    [
        '    </header>',
        '    <body>'
    ], jsonData.map(function(unit) {
        return [
            '<trans-unit id="' + unit.id + '">',
            '  <source xml:lang="' + unit.source.lang + '">' + (unit.source.content|| '') + '</source>',
            '  <target xml:lang="' + unit.target.lang + '">' + (unit.target.content || '') + '</target>',
            '  <alt-trans>'
        ].concat(
            unit.altTrans.map(function(altTransUnit) {
             return [ '    <target xml:lang="' + altTransUnit.targetLang + '">' + (altTransUnit.target|| '') + '</target>']
            }),
            ['  </alt-trans>',
            '</trans-unit>'
            ])
    .join(EOL);
    }),
    [
        '    </body>',
        ' </file>',
        '</xliff>'
    ]).join(EOL);
};
