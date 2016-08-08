const md2xliff = require('md2xliff');

const renderer = require('../renderer');
const Segment = require('../db').Segment;

const helpers = require('../helpers');
const { onError, onAjaxError } = helpers.error;

function getContent(req, res) {
    const doc = req.query.doc;
    const passport = req.session.passport || {};
    const token = passport.user && passport.user.token;

    if (!doc) res.send('Привет! Тут мы расскажем о нашем сервисе');

    return helpers.github.getContent(doc, token)
        .then(function(response) {
            extract = md2xliff.extract(response.data);
            const { srcLang, trgLang, units } = extract.data;

            helpers.translator.getTM(trgLang, srcLang, units)
                .then(units => {
                    renderer(req, res, {
                        view: 'index-page',
                        pageTitle: 'xliff-editor',
                        segments: units,
                        sourceLang: srcLang,
                        targetLang: trgLang,
                        user: passport.user,
                        repo: doc
                    })
                })
                .catch(err => { onError(req, res, err); });
        })
}

function createPullRequest(req, res) {}

function getTranslate(req, res) {
    const { segment, sourceLang, targetLang } = req.query;
    const context = { block: 'alternative-translation' };

    return helpers.translator.findSegment(targetLang, sourceLang, segment)
        .then(data => {
            renderer(req, res, {
                translations: data
            }, context);
        }).catch(err => { onAjaxError(req, res, err); });
}

function saveMemory(req, res) {
    const data = JSON.parse(req.body.data);

    Segment.collection.insert(data, err => {
        if (err) onAjaxError(req, res, err);

        res.send('Segment successfully created!');
    });
}

module.exports = {
    // /?doc=https://github.com/bem/bem-method/blob/bem-info-data/articles/bem-for-small-projects/bem-for-small-projects.ru.md
    getContent: getContent,
    createPullRequest: createPullRequest,
    getTranslate: getTranslate,
    saveMemory: saveMemory
};
