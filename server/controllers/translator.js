const Segment = require('../db').Segment;
const md2xliff = require('md2xliff');
const GitHubApi = require('../GitHubApi');
const Promise = require('pinkie-promise');
const renderer = require('../renderer');

function getMemory(req, res) {
    const passport = req.session.passport || {};
    const token = passport.user && passport.user.token;

    return GitHubApi.getContent(req.query.doc, token)
        .then(function(data) {
            const xliff = md2xliff.extract(data.data);
            const { srcLang, trgLang, units } = xliff.data;
            const context = { block: 'editor' };

            return Promise.all(units.map(unit => {
                const $search = `"${unit.source.content}"`;
                const $text = { $search };
                const target_lang = trgLang;
                const source_lang = srcLang;
                const query = { target_lang, source_lang, $text };

                return Segment.find(query, { weight: { $meta: 'textScore' } })
                    .sort({ weight: { $meta: 'textScore' } })
                    .exec()
                    .then((data) => {
                        if (data.length) {
                            const value = data[0];
                            unit.target.content = value.target;
                            (value.source === unit.source.content) && (unit.status = true);
                        }

                        return unit;
                    })
            })).then((data) => {

                renderer(req, res, {
                    segments: data,
                    sourceLang: srcLang,
                    targetLang: trgLang,
                    user: passport.user,
                    repo: req.query.doc
                }, context);
            });
        });
}

function saveMemory(req, res) {
    const data = JSON.parse(req.body.data);

    Segment.collection.insert(data, (err) => {
        if (err) throw err;

        res.send('Segment successfully created!');
    });
}

function getTranslate(req, res) {

}

module.exports = {
    getMemory: getMemory,
    saveMemory: saveMemory,
    getTranslate: getTranslate
};
