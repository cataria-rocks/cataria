const GitHub = require('github-api');

function getContent(owner, repo, tree, path, token) {
    const auth = token ? { token: token } : {};
    // TODO: инициализировать один раз
    const gh = new GitHub(auth);

    console.log(gh);
    return gh
        .getRepo(owner,repo) // Get repo
        .getContents(tree, path, true);
}

module.exports = {
    getContent: getContent
};
