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

function createPr(req, content, lang) {
    const doc = req.body.doc;
    const user = req.session.passport.user;
    const { owner, name, branch } = parseGHUrl(doc);
    const { token, login } = user;
    const client = ghClient({ version: 3, auth: token });
    let pathToDoc;
    let newBranch;

    if (req.query.target) {
        const docUrlArr = doc.split('/');
        docUrlArr.pop();
        docUrlArr.push(req.query.target);
        pathToDoc = docUrlArr.join('/');
    } else {
        pathToDoc = doc.split(branch)[1].substr(1).split('.');

        // change doc lang
        pathToDoc.splice(pathToDoc.length - 1, 1, lang, pathToDoc[pathToDoc.length - 1]);
        pathToDoc = pathToDoc.join('.');
    }

    newBranch = `translate_${pathToDoc}`;

    client.fork(owner, name);

    client.branch(login, name, branch, newBranch);

    return client.commit(login, name, {
        branch: newBranch,
        message: `Update translate for ${pathToDoc}`,
        updates: [{
            path: pathToDoc,
            content: content
        }]
    }).then(() => {
            return client.pull(
                { user: login, repo: name, branch: newBranch },
                { user: owner, repo: name, branch },
                { title: `Update translate for ${pathToDoc}`, body: `Update translate for ${pathToDoc}` })
        })
        .catch(err => { console.log('Err commit', err) })
}
module.exports = {
    getContent,
    createPr
};
