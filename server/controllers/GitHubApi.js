const renderer = require('../renderer');
const md2xliff = require('md2xliff');
const GitHub = require('github-api');

function getContent(req, res) {
    const { owner, repo, path } = req.query;
    // TODO: default_branch tree как узнать!!!!
    const tree = 'bem-info-data';

    // TODO: перенести в другое место и вызывать один раз!
    const gh = new GitHub({ token: req.session.passport.user.token });

    gh
        .getRepo(owner,repo) // Get repo
        .getContents(tree, path, true, function(err, data) { // Get content
            if (err) { res.redirect('/err')}

            extract = md2xliff.extract(data);
            const { srcLang, trgLang, units } = extract.data;

            renderer(req, res, {
                view: 'index-page',
                pageTitle: 'xliff-editor',
                segments: units,
                sourceLang: srcLang,
                targetLang: trgLang
            });
        });
}

function createPR(req, res) {
    // TODO: брать из params
    var options = {
        "title": "Amazing new feature",
        "body": "Please pull this in!",
        "head": "octocat:new-feature",
        "base": "bem-info-data"
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
    // get?owner=owner&repo=repo?path=path
    getContent: getContent
};
