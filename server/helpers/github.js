const GitHub = require('github-api');
const parseGHUrl = require('parse-github-url');

function getContent(doc, token) {
    const { owner, name, branch } = parseGHUrl(doc);
    const pathToDoc = doc.split(branch)[1].substr(1);

    // TODO: инициализировать один раз
    const auth = token ? { token: token } : {};
    const gh = new GitHub(auth);

    return gh
        .getRepo(owner, name) // Get repo
        .getContents(branch, pathToDoc, true);
}

module.exports = {
    getContent: getContent
};
