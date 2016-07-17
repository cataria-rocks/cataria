const Segment = require('../db/index').Segment;
const md2xliff = require('md2xliff');
const GitHubApi = require('../GitHubApi');
const Promise = require('pinkie-promise');

function getMemory(req, res) {
    const { owner, repo, path } = req.query;
    const tree = 'bem-info-data'; // TODO: default_branch tree как узнать!!!!
    const token = req.session.passport.user.token;

    GitHubApi.getContent(owner, repo, tree, path, token)
        .then(function(data) {
            extract = md2xliff.extract(data.data);
            const { srcLang, trgLang, units } = extract.data;

            Promise.all(units.map(unit => {
                const $search = '"' + unit.source.content + '"'; // '"привет аня"' -> поиск по полному вхождению фразы
                const $text = { $search };
                const target_lang = trgLang;
                const source_lang = srcLang;
                const query = { target_lang, source_lang, $text };

                return Segment.find(query, { weight: { $meta: 'textScore' } })
                        .sort({ weight: { $meta: 'textScore' } })
                        .exec((err, data) => {
                            if (err) { res.send({ query, err }); }

                            if (data.length) unit.target.content = data[0].target;

                            return unit;
                        })
            })).then(function(units) {
                res.send(units);
            }).catch(function(err) { if (err) { res.redirect('/err')} });
        })
}

function saveMemory(req, res) {
    const data = JSON.parse(req.body.data);
    console.log('data', data);
    Segment.collection.insert(data, (err, data) => {
        if (err) throw err;
        console.log(data);
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
