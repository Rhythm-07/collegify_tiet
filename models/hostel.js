// models/hostel.js
const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
    hostel: {
        type: String,
        required: true
    },
    warden_name: {
        type: String,
        required: true
    },
    warden_mobile: {
        type: String,
        required: true
    },
    caretaker: {
        type: String,
        required: true
    },
    caretaker_mobile: {
        type: String,
        required: true
    },
    proctor: {
        type: String,
        required: true
    },
    proctor_mobile: {
        type: String,
        required: true
    }
}, { collection: 'hostel' });

const Hostel = mongoose.model('Hostel', hostelSchema);
module.exports = Hostel;
