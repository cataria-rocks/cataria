const path = require('path');

const bundleName = 'index';
const pathToBundle = path.join(__dirname, '..', 'desktop.bundles', bundleName);
const BEMHTML = require(path.join(pathToBundle, bundleName + '.bemhtml.js')).BEMHTML;
const bemtrees = require(path.join(pathToBundle, bundleName + '.bemtree.js')).BEMTREE;

function render(req, res, data, context, send) {
    let bemjson;

    data.query = req && req.query || {};

    if (req && req.query.hasOwnProperty('json')) return res.send('<pre>' + JSON.stringify(data, null, 4) + '</pre>');

    try {
        bemjson = (bemtrees).apply({
            block: 'root',
            context: context,
            staticRoot: '/',
            data: data
        });
    } catch (err) {
        console.log(err);
        console.log(err.stack);
        return res.send(err.toString()); // TODO: show err message just for dev env
    } finally {

    }

    if (req && req.query.hasOwnProperty('bemjson')) return res.send('<pre>' + JSON.stringify(bemjson, null, 4) + '</pre>');

    const html = BEMHTML.apply(bemjson);

    return !send ? res.send(html) : html;
}

module.exports = render;
