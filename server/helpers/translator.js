const Segment = require('../db').Segment;
const renderer = require('../renderer');

function findSegment(target_lang, source_lang, content) {
    const $search = `${content}`;
    const $text = { $search };
    const query = { target_lang, source_lang, $text };

    return Segment.find(query, { weight: { $meta: 'textScore' } })
        .sort({ weight: { $meta: 'textScore' } })
        .exec();
}

function getTM(trgLang, srcLang, units) {
    return Promise.all(units.map(unit => {
        return findSegment(trgLang, srcLang, unit.source.content)
            .then(data => {
                unit.altTrans = renderer(null, null, data, { block: 'alternative-translation' }, true);

                if (data.length > 0) {
                    const value = data[0]; // element with a high percentage of matches

                    if (value.source === unit.source.content) {
                        unit.target.content = value.target; // insert translation in segment's field target
                        unit.status = true
                    }
                }

                return unit;
            })
    }))
}

module.exports = {
    findSegment: findSegment,
    getTM: getTM
};
