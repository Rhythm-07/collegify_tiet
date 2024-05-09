const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema({
    name: String,
    website: String,
    branches: String,
    eligibility: String,
    process: String,
    CTC: String
},{ collection: 'placements' });

const Placement = mongoose.model('Placement', placementSchema);

module.exports = Placement;
