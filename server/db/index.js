const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(process.env.EDITOR_DB_CREDENTIALS || require('../../config').dbCredentials ||  'mongodb://localhost/xliff-editor');
const Schema = mongoose.Schema;

const SegmentSchema = new Schema({
    target: String,
    targetLang: String,
    source: { type: String, text: true },
    sourceHtml: String,
    sourceLang: String,
    status: Boolean,
    date: Number // timestamp
});

SegmentSchema.index({ source: 'text' });

const Segment = mongoose.model('Segment', SegmentSchema);

module.exports = {
    Segment
};
