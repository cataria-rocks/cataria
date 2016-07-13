const Segment = require('../db/index').Segment;
const md2xliff = require('md2xliff');
const GitHubApi = require('../GitHubApi');
const Promise = require('pinkie-promise');

// 0 mongod --setParameter textSearchEnabled=true
// 1 создать интексы полнотекстового поиска
// db.collection.ensureIndex( { source: "text" } )
// 2  вклюс=чить поддержку русского языка
// db.youcollection.ensureIndex( { source : "text" }, { default_language: segment.sourceLng })
// db.collection.runCommand( "text", { search: "s" } )
// https://habrahabr.ru/post/174457/

// async
// 1 get segments list
// { source_lang:ru, source: 'привет', target_lang: 'en' }

// db.collection.runCommand( "text", { search: "меч" } )
function getMemory(req, res) {
    const { owner, repo, path } = req.query;
    const tree = 'bem-info-data'; // TODO: default_branch tree как узнать!!!!
    const token = req.session.passport.user.token;

    GitHubApi.getContent(owner, repo, tree, path, token)
        .then(function(data) {
            extract = md2xliff.extract(data.data);
            const { srcLang, trgLang, units } = extract.data;

            Promise.all(units.map(unit => {
                let $search = '"' + unit.source.content + '"'; // '"привет аня"' -> поиск по полному вхождению фразы
                let $text = { $search };
                let target_lang = trgLang;
                let source_lang = srcLang;
                let query = { target_lang, source_lang, $text };

                return Segment.find(query, { weight: { $meta: 'textScore' } })
                        .sort({ weight: { $meta: 'textScore' } })
                        .exec((err, data) => {
                            if (err) { res.send({ query, err }); }

                            if (data.length) unit.source.content = data[0].target;

                            console.log('====================================>');
                            console.log('unit', unit);

                            return unit;
                        })
            })).then(function(units) {
                console.log('====================================>');
                console.log('units', units);

                res.send(units);
            }).catch(function(err) { if (err) { res.redirect('/err')} });
        })
}

function saveMemory(req, res) {
    const params = req.params;
    // TODO
    const segment = new Segment({
        target: 'Hello1',
        target_lang: 'en',
        source: 'привет аня шарики укепм',
        source_lang: 'ru',
        status: true,
        date: +new Date()
    });

    segment.save(err => {
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
