const renderer = require('../renderer');
const md2xliff = require('md2xliff');
const GitHub = require('github-api');
const GitHubApi = require('../GitHubApi');

function getContent(req, res) {
    const doc = req.query.doc;
    const passport = req.session.passport || {};
    const token = passport.user && passport.user.token;

    if (!doc) res.send('Привет! Тут мы расскажем о нашем сервисе');

    return GitHubApi.getContent(doc, token)
        .then(function(response) {
            extract = md2xliff.extract(response.data);
            const { srcLang, trgLang, units } = extract.data;

            renderer(req, res, {
                view: 'index-page',
                pageTitle: 'xliff-editor',
                segments: units,
                sourceLang: srcLang,
                targetLang: trgLang,
                user: passport.user,
                repo: req.query.doc
            });
        })
        .catch(err => {
            console.error(err);
            res.send(500);
        });
}

function createPR(req, res) {
    // TODO: брать из params
    var options = {
        title: 'Amazing new feature',
        body: 'Please pull this in!',
        head: 'octocat:new-feature',
        base: 'bem-info-data'
    };

    // TODO: перенести в другое место и вызывать один раз!
    const gh = new GitHub({ token: req.session.passport.user.token });

    // TODO: брать из params
    const owner = 'bem';
    const repo = 'bem-method';

    gh
        .getRepo(owner,repo) // Get repo
        .fork(function(err, data) { // Create fork
            if (err) { res.redirect('/err')}

            res.send(data);
        });

    // TODO: create commit

    // TODO: create PR

}

module.exports = {
    createPullRequest: createPR,
    // /?doc=https://github.com/bem/bem-method/blob/bem-info-data/articles/bem-for-small-projects/bem-for-small-projects.ru.md
    getContent: getContent
};
