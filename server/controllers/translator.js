const Segment = require('../db').Segment;
const md2xliff = require('md2xliff');
const GitHubApi = require('../GitHubApi');
const Promise = require('pinkie-promise');
const renderer = require('../renderer');
const translate = require('yandex-translate')(process.env.YANDEX_TRANSLATE_KEY);

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
            })).then(data => {
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
    const passport = req.session.passport || {};
    const data = JSON.parse(req.body.data);
    // TODO: this should be in another place
    return Promise.all(data.map(item => {
        return new Promise((resolve, reject) => {
            if (item.target) {
                item.source = { content: item.source };
                item.target = { content: item.target };
                return resolve(item);
            }
            translate.translate(item.source, {
                    // TODO: here we should think for better solution
                    // maybe we should use simplified format anywhere
                    from: item.source_lang.slice(0, 2),
                    to:   item.target_lang.slice(0, 2)
                },
                function(err, result) {
                    if (err) {
                        console.error(err);
                        return reject({ code: 500, message: err.message });
                    }

                    if (result.code === 200) {
                        item.target = { content: result.text[0] };
                        item.source = { content: item.source };
                        return resolve(item);
                    } else {
                        console.error(result.code, result.message, 'from: translator.js:87');
                        reject(result);
                    }
                }
            );
        });
    }))
        .then(data => {
            renderer(req, res, {
                segments: data,
                sourceLang: data[0].source_lang,
                targetLang: data[0].target_lang,
                user: passport.user,
                repo: req.query.doc
            }, { block: 'editor' });
        })
        .catch(reason => res.status(reason.code).send(reason.message));
}

module.exports = {
    getMemory: getMemory,
    saveMemory: saveMemory,
    getTranslate: getTranslate
};
