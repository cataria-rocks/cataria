const gna = require('github-node-api')();
const parseGHUrl = require('parse-github-url');

function getContent(url) {
    const { owner, name: repo, branch } = parseGHUrl(url);
    const pathToDoc = url.split(branch)[1].substr(1);

    return gna.getContentsStr(owner, repo, pathToDoc, branch);
}

// fork a repo -> create new branch in a fork -> commit a file -> make pull request
// update.content
// update.message
function createPR(doc, newOwner, newBranch, update) {
    const { owner, name: repo, branch: sourceBranch } = parseGHUrl(doc);

    return gna.fork(owner, repo)
        .then(() => gna.branch(newOwner, repo, sourceBranch, newBranch)
            .catch(err => {
                if (err.code === 422) {
                    // TODO: branch already exists
                    // use force?
                    return;
                }

                throw err;
            })
        )
        .then(() => gna.commit(newOwner, repo, {
            branch: newBranch,
            message: update.message,
            updates: [{
                path: update.path,
                content: update.content
            }]
        }))
        .then(() => gna.pull(
            { owner: newOwner, repo, branch: newBranch },
            { owner, repo, branch: sourceBranch },
            { title: update.message })
        )
        .catch(err => { console.error('Error creating PR', err.stack || err); });
}

module.exports = {
    getContent,
    createPR
};
