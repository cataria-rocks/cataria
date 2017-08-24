var xamel = require('xamel'),
    xmlParse = require('md2xliff/lib/xml-parse');

function stripParentNode(xmlStr) {
    return xmlStr.replace(/^<.+?>(.*)<\/.+?>$/, '$1');
}

module.exports = function(tmxFile) {
   return xmlParse(tmxFile, { trim: false })
        .then(function(data) {
            var tmxUnits = data.find('tmx/body/tu');

            return tmxUnits.map(function(tmxUnit) {
                var obj = {};

                var targetLang = tmxUnit.find('tuv').eq(0).attr('xml:lang');
                var sourceLang = tmxUnit.find('tuv').eq(1).attr('xml:lang');

                var tmxTargetSeg = tmxUnit.isAttr('xml:lang', targetLang).find('tuv/seg');
                var tmxSourceSeg = tmxUnit.isAttr('xml:lang', sourceLang).find('tuv/seg');

                obj.target = stripParentNode(xamel.serialize(tmxTargetSeg, { header: false }));
                obj.targetLang = targetLang;
                obj.source = stripParentNode(xamel.serialize(tmxSourceSeg, { header: false }));
                obj.sourceHtml = stripParentNode(xamel.serialize(tmxSourceSeg, { header: false }));
                obj.sourceLang = sourceLang

                return obj;
            });
        })
       // .catch(err => onError(req, res, err));
};
