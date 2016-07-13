const GitHub = require('github-api');

function getContent(owner, repo, tree, path, token) {
    // TODO: перенести в другое место и вызывать один раз!
    const gh = new GitHub({ token: token });

    return gh
        .getRepo(owner,repo) // Get repo
        .getContents(tree, path, true);
}

module.exports = {
    getContent: getContent
};
