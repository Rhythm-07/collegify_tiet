const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    year: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    file_name: {
        type: String,
        required: true
    }
}, { collection: 'study-material' });

const StudyMaterial = mongoose.model('StudyMaterial', schema);
module.exports = StudyMaterial;
