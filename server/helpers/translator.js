const Segment = require('../db').Segment;
const yandexTranlateKey = process.env.EDITOR_YANDEX_TRANSLATOR_KEY || require('../../config.json').yandexTranlateKey;
const yandexTranslator = require('yandex-translate')(yandexTranlateKey);
const Fuse = require('fuse.js');

function findSegment(targetLang, sourceLang, content) {
    const $search = content;
    const $text = { $search };
    const query = { targetLang, sourceLang, $text };

    return Segment.find(query, { weight: { $meta: 'textScore' } })
        .sort({ weight: { $meta: 'textScore' } })
        .exec();
}

function getTM(trgLang, srcLang, units) {
    return Promise.all(units.map(unit => {
        const sourceHtml = unit.source.content;

        // ReqExp replace <bpt id=l1>[</bpt> etc.
        const source = sourceHtml.replace(/<[^>]*>[^>]*>/g, '');

        return findSegment(trgLang, srcLang, source)
            .then(data => {
                let lastDate = 0; // last actual date

                data.forEach(item => {
                    if (item.source === source && item.date >= lastDate) {

                        lastDate = item.date;

                        unit.target.content = item.target; // insert tm in segment's field - 'target'
                        unit.status = item.sourceHtml === sourceHtml && item.status;
                    }
                });

                /*
                params for Fuse search:
                @keys - List of properties that will be searched.
                    This supports nested properties, weighted search, searching in arrays
                @threshold - At what point does the match algorithm give up.
                    A threshold of 0.0 requires a perfect match (of both letters and location),
                    a threshold of 1.0 would match anything.
                @maxPatternLength - The maximum length of the pattern.
                 */

                if (data.length) {
                    const fuse = new Fuse(data, { keys: ['source'], threshold: 0.2, distance: 10, maxPatternLength: 250, tokenSeparator: 'ЪЪЪЪЪЪ' });
                    unit.altTrans = fuse.search(source);
                } else {
                    unit.altTrans = [];
                }

                unit.altTrans.map(result => {
                    if (result.source === source && result.date === lastDate) {
                        result.bestMatch = true;
                    }
                });

                unit.keys = sourceHtml.match(/<[^>]*>[^>]*>/g);

                return unit;
            })
    }))
}

function saveTM(unit) {
    unit.date = new Date().getTime(); // update date every time

    return Segment.collection.update({
        target: unit.target,
        targetLang: unit.targetLang,
        source: unit.source,
        sourceHtml: unit.sourceHtml,
        sourceLang: unit.sourceLang
    }, unit, { upsert: true });
}

function getYaTranslate(item) {
    return new Promise((resolve, reject) => {
        if (item.target.content) return resolve(item);
        if (!yandexTranlateKey) return reject('Yandex Translate API key is invalid');

        const source = item.source;
        const srcLang = source.lang.slice(0, 2);
        const trgLang = item.target.lang.slice(0, 2);

        yandexTranslator.translate(source.content, { from: srcLang, to: trgLang }, (err, result) => {
            if (err) {
                console.error(err);
                return reject({ code: 500, message: err.message });
            }

            if (result.code === 200) {
                item.target.content = result.text[0];
                return resolve(item);
            }

            console.error(result.code, result.message);
            reject(result);
        });
    });
}

module.exports = {
    findSegment,
    getTM,
    saveTM,
    getYaTranslate
};
