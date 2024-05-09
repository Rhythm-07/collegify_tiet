// models/society.js
const mongoose = require('mongoose');

const societySchema = new mongoose.Schema({
    society: {
        type: String,
        required: true
    },
    upcoming_events: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { collection: 'society' });

const Society = mongoose.model('Society', societySchema);
module.exports = Society;
