const xamel = require('xamel');
const xmlParse = require('md2xliff/lib/xml-parse');

function stripParentNode(xmlStr) {
    return xmlStr.replace(/^<.+?>(.*)<\/.+?>$/, '$1');
}

module.exports = function(tmxFile) {
   return xmlParse(tmxFile, { trim: false }).then(data => {
        return data.find('tmx/body/tu').map(tmxUnit => {
            const targetLang = tmxUnit.find('tuv').eq(0).attr('xml:lang');
            const sourceLang = tmxUnit.find('tuv').eq(1).attr('xml:lang');
            const tmxTargetSeg = tmxUnit.isAttr('xml:lang', targetLang).find('tuv/seg');
            const tmxSourceSeg = tmxUnit.isAttr('xml:lang', sourceLang).find('tuv/seg');

            return {
                target: stripParentNode(xamel.serialize(tmxTargetSeg, { header: false })),
                targetLang: targetLang,
                source: stripParentNode(xamel.serialize(tmxSourceSeg, { header: false })),
                sourceHtml: stripParentNode(xamel.serialize(tmxSourceSeg, { header: false })),
                sourceLang: sourceLang
            };
        });
    });
};
