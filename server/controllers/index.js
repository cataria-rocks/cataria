const md2xliff = require('md2xliff');
const renderer = require('../renderer');

const Segment = require('../db').Segment;
const helpers = require('../helpers');

const { onError, onAjaxError } = helpers.error;

function getContent(req, res) {
    const query = req.query;
    const doc = query.doc;
    const passport = req.session.passport || {};
    const token = passport.user && passport.user.token;

    if (!doc) return renderer(req, res, {
        view: 'blank',
        pageTitle: 'cataria'
    });

    return helpers.github.getContent(doc, token)
        .then(function(response) {
            const filename = doc.split('/').pop();
            const extract = md2xliff.extract(response.data, filename, filename.replace(/\.md$/, '.skl'), query.sourceLang, query.targetLang);
            const { srcLang, trgLang, units } = extract.data;

            helpers.translator.getTM(trgLang, srcLang, units)
                .then(units => {
                    renderer(req, res, {
                        view: 'index-page',
                        pageTitle: 'cataria',
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
    const { data, doc } = req.body;
    const user = req.session.passport.user;
    const lang = JSON.parse(data)[0].target.lang.slice(0, 2); // ru-Ru -> ru

    return helpers.github.getContent(doc, user.token)
        .then(function(response) {
            const filename = doc.split('/').pop();
            const extract = md2xliff.extract(response.data, filename, filename.replace(/\.md$/, '.skl'), req.query.sourceLang, req.query.targetLang);
            const translatedText = md2xliff.reconstruct(JSON.parse(data), extract.skeleton);
            helpers.github.createPr(req, translatedText, lang)
                .then(status => res.send('PR successfully created!'))
                .catch(err => { onError(req, res, err); });
        });
}

function saveMemory(req, res) {
    const data = JSON.parse(req.body.data);
    const promises = data.map(helpers.translator.saveTM);

    return Promise.all(promises)
        .then(() => {
            res.send('Segment successfully created!');
        });

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

function getYaTranslate(req, res) {
    const data = JSON.parse(req.body.data);
    const srcLang = data[0].source.lang;
    const trgLang = data[0].target.lang;

    const promises = data.map(helpers.translator.getYaTranslate);

    return Promise.all(promises)
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
    getContent,
    createPullRequest,
    saveMemory,
    updateTM,
    getYaTranslate
};
