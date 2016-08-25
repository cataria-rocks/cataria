const GitHub = require('github-api');
const parseGHUrl = require('parse-github-url');
const ghClient = require('github-basic');

function getContent(doc, token) {
    const { owner, name, branch } = parseGHUrl(doc);
    const pathToDoc = doc.split(branch)[1].substr(1);

    const auth = token ? { token: token } : {};
    const gh = new GitHub(auth);

    return gh
        .getRepo(owner, name)
        .getContents(branch, pathToDoc, true);
}

function createPr(doc, info, file, lang) {
    const { owner, name, branch } = parseGHUrl(doc);
    const { token, login } = info;
    const client = ghClient({ version: 3, auth: token });

    let pathToDoc = doc.split(branch)[1].substr(1).split('.');

    // change doc lang
    pathToDoc.splice(pathToDoc.length - 1, 1, lang, pathToDoc[pathToDoc.length - 1]);
    pathToDoc = pathToDoc.join('.');

    client.fork(owner, name);

    return client.commit(login, name, {
        branch: branch,
        message: `Update translate for ${pathToDoc}`,
        updates: [{
            path: pathToDoc,
            content: file
        }]
    }).then(() => {
            return client.pull(
                { user: login, repo: name, branch },
                { user: owner, repo: name, branch },
                { title: `Update translate for ${pathToDoc}`, body: `Update translate for ${pathToDoc}` })
        })
        .catch(err => { console.log('Err commit', err) })
}
module.exports = {
    getContent,
    createPr
};
