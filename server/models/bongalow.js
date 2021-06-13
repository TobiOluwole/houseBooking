const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    building_name: {
        type: String,
        required: true
    },
    building_id: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    pic_link_1: {
        type: String,
        required: true
    },
    pic_link_2: {
        type: String,
        required: true
    }
});

const BongalowDB = mongoose.model('bongalows',schema);

module.exports = BongalowDB;