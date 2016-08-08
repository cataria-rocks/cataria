const renderer = require('../renderer');

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

    res.status(code).send(errBody);
}

function _renderErrorPage(req, res, err) {
    res.status(err.statusCode || 500);
    console.log('p;p;');
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
    onAjaxError: onAjaxError
};
