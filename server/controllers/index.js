const md2xliff = require('md2xliff');

const renderer = require('../renderer');
const Segment = require('../db').Segment;

const helpers = require('../helpers');
const { onError, onAjaxError } = helpers.error;

function getContent(req, res) {
    const doc = req.query.doc;
    const passport = req.session.passport || {};
    const token = passport.user && passport.user.token;

    if (!doc) return res.redirect('/about');

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

function createPullRequest(req, res) {
    // TODO: send PR
}

function getTranslate(req, res) {
    // TODO: ya translate
}

function saveMemory(req, res) {
    const data = JSON.parse(req.body.data);
    const promises = data.map(helpers.translator.saveTM);

    return Promise.all(promises)
        .then(() => {
            res.send('Segment successfully created!');
        })

}

function updateTM(req, res) {
    const data = JSON.parse(req.body.data);
    const srcLang = data[0].source.lang;
    const trgLang = data[0].target.lang;

    helpers.translator.getTM(trgLang, srcLang, data)
        .then(units => {
            renderer(req, res, {
                segments: units,
                sourceLang: srcLang,
                targetLang: trgLang
            }, { block: 'editor' })
        })
        .catch(err => { onError(req, res, err); });
}

module.exports = {
    // /?doc=https://github.com/bem/bem-method/blob/bem-info-data/articles/bem-for-small-projects/bem-for-small-projects.ru.md
    getContent: getContent,
    createPullRequest: createPullRequest,
    getTranslate: getTranslate,
    saveMemory: saveMemory,
    updateTM: updateTM
};
