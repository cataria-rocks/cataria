const renderer = require('../renderer');

function onError(req, res, err, url) {
    console.log('requested url:', url);
    _logError(err);
    _renderErrorPage(req, res, err);
}

function onAjaxError(req, res, err) {
    const errBody = err.response ? err.response.body : '';
    const code = err.statusCode || 500;

    console.log('Ajax url: ', req.path);
    _logError(err);

    res.status(code).send(typeof err === 'string' ? err : errBody || err.message || 'Something went wrong');
}

function _renderErrorPage(req, res, err) {
    res.status(err.statusCode || 500);
    renderer(req, res, { errMessage: err.message || 'Something went wrong', view: 'error' });
}

function _logError(err) {
    err.response && err.response.body && console.error('err.response.body:', err.response.body);
    err.body && console.error('err.body:', err.body);
    typeof err !== 'string' && console.error('ERR.message:' + err.message + '; ERR.host: ' + err.host + '; ERR.path: ' + err.path);
    console.error(err.stack || err);
}

module.exports = {
    onError,
    onAjaxError
};
