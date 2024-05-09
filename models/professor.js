const mongoose = require('mongoose');


const professorSchema = new mongoose.Schema({
    name: String,
    email: String,
    area_of_work: String
},{ collection: 'professors' });


const Professor = mongoose.model('Professor', professorSchema);
module.exports = Professor