const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/xliff-editor');

const Schema = mongoose.Schema;

const SegmentSchema = new Schema({
    target: String,
    target_lang: String,
    source: String,
    source_lang: String,
    status: Boolean,
    date: Date
});

SegmentSchema.index({ source: 'text' });
// db.collection.enshureIndex({field: value})

const Segment = mongoose.model('Segment', SegmentSchema);

module.exports = {
    Segment
};
