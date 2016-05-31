const Segment = require('../db/index').Segment;
const md2xliff = require('md2xliff');

function getMemory(req, res) {
    const params = req.params;
}

function saveMemory(req, res) {
    const params = req.params;
    // TODO
    const segment = new Segment({
        target: 'Hello',
        target_lang: 'en',
        source: 'Привет',
        source_lang: 'ru',
        status: true,
        date: +new Date()
    });

    segment.save(err => {
        if (err) throw err;
        res.send('Segment successfully created!');
    });
}

function getTranslate(req, res) {}

module.exports = {
    getMemory: getMemory,
    saveMemory: saveMemory,
    getTranslate: getTranslate
};
