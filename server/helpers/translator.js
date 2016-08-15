const Segment = require('../db').Segment;
const yandexTranlateKey = require('../../config.json').yandexTranlateKey;
const yandexTranslator = require('yandex-translate')(yandexTranlateKey);

function findSegment(target_lang, source_lang, content) {
    const $search = content.replace(/<[^>]*>*/g,'');
    const $text = { $search };
    const query = { target_lang, source_lang, $text };

    return Segment.find(query, { weight: { $meta: 'textScore' } })
        .sort({ weight: { $meta: 'textScore' } })
        .exec();
}

function getTM(trgLang, srcLang, units) {
    return Promise.all(units.map(unit => {
        // segments are stored in the db without tags bpt/ept, but with '[]/()'
        const source = unit.source.content.replace(/<[^>]*>*/g,'');

        return findSegment(trgLang, srcLang, source)
            .then(data => {
                const value = data.length > 0 && data[0]; // element with a high percentage of matches

                if (value && (value.source === source)) {
                    unit.target.content = value.target; // insert tm in segment's field - 'target'
                    unit.status = true; // TODO:
                }

                unit.altTrans = data; // data for block 'alt. translation'

                return unit;
            })
    }))
}

function saveTM(unit) {
    return Segment.collection.update(unit, unit, { upsert: true }, err => {
        if (err) onAjaxError(req, res, err);

        return unit;
    });
}

function getYaTranslate(item) {
    return new Promise((resolve, reject) => {
        if (item.target.content) return resolve(item);

        const source = item.source;
        const srcLang = source.lang.slice(0, 2);
        const trgLang = item.target.lang.slice(0, 2);

        yandexTranslator.translate(source.content.replace(/<[^>]*>*/g,''), { from: srcLang, to: trgLang }, (err, result) => {
            if (err) {
                console.error(err);
                return reject({ code: 500, message: err.message });
            }

            if (result.code === 200) {
                item.target.content = result.text[0];
                return resolve(item);
            } else {
                console.error(result.code, result.message, 'from: translator.js:61');
                reject(result);
            }
        })
    })
}

module.exports = {
    findSegment: findSegment,
    getTM: getTM,
    saveTM: saveTM,
    getYaTranslate: getYaTranslate
};
