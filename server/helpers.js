const GitHub = require('github-api');
const parseGHUrl = require('parse-github-url');
const Segment = require('./db').Segment;

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

function findSegment(target_lang, source_lang, content) {
    const $search = `${content}`;
    const $text = { $search };
    const query = { target_lang, source_lang, $text };

    return Segment.find(query, { weight: { $meta: 'textScore' } })
        .sort({ weight: { $meta: 'textScore' } })
        .exec();
}

function onError(req, res, err, url) {
    console.log('requested url:', url);
    _logError(err);
    _renderErrorPage(req, res, err);
}

function onAjaxError(req, res, err) {
    var errBody = err.response ? err.response.body : '',
        code = err.statusCode;

    console.log('Ajax url: ', req.path);
    _logError(err);

    res.status(code);
    res.send(errBody);
}

function _renderErrorPage(req, res, err) {
    res.status(err.statusCode || 500);
    renderer(req, res, { errMessage: err.message, view: 'error' });
}

function _logError(err) {
    err.response && console.error('err.response.body:', err.response.body);
    err.body && console.error('err.body:', err.body);
    console.error('ERR.message:' + err.message + '; ERR.host: ' + err.host + '; ERR.path: ' + err.path);
    console.error(err.stack);
}
module.exports = {
    onError: onError,
    onAjaxError: onAjaxError,
    getContent: getContent,
    findSegment: findSegment
};
