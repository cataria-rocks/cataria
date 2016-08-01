const Segment = require('../db').Segment;
const md2xliff = require('md2xliff');
const helpers = require('../helpers');
const Promise = require('pinkie-promise');
const renderer = require('../renderer');
const onAjaxError = helpers.onAjaxError;

function getMemory(req, res) {
    const passport = req.session.passport || {};
    const token = passport.user && passport.user.token;
    const context = { block: 'editor' };
    const { doc } = req.query;

    return helpers.getContent(doc, token)
        .then(function(text) {
            const xliff = md2xliff.extract(text.data);
            const { srcLang, trgLang, units } = xliff.data;

            return Promise.all(units.map(unit => {
                return helpers.findSegment(trgLang, srcLang, unit.source.content)
                    .then(data => {
                        if (data.length > 0) {
                            const value = data[0]; // element with a high percentage of matches

                            unit.target.content = value.target; // insert translation in segment's field target
                            (value.source === unit.source.content) && (unit.status = true);
                        }

                        return unit;
                    })
            })).then(data => {
                renderer(req, res, {
                    segments: data,
                    sourceLang: srcLang,
                    targetLang: trgLang,
                    user: passport.user,
                    repo: doc
                }, context);
            }).catch(function(err) { onAjaxError(req, res, err); });
        });
}

function getAltTranslate(req, res) {
    const { segment, sourceLang, targetLang } = req.query;
    const context = { block: 'alternative-translation' };

    return helpers.findSegment(targetLang, sourceLang, segment)
        .then(data => {
            renderer(req, res, {
                translations: data
            }, context);
        }).catch(function(err) { onAjaxError(req, res, err); });
}

function saveMemory(req, res) {
    const data = JSON.parse(req.body.data);

    Segment.collection.insert(data, err => {
        if (err) onAjaxError(req, res, err);

        res.send('Segment successfully created!');
    });
}

function getTranslate(req, res) {

}

module.exports = {
    getMemory: getMemory,
    saveMemory: saveMemory,
    getTranslate: getTranslate,
    getAltTranslate: getAltTranslate
};
