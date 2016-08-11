const Segment = require('../db').Segment;

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

module.exports = {
    findSegment: findSegment,
    getTM: getTM,
    saveTM: saveTM
};
