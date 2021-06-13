const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    customer_id: {
        type: String,
        required: true
    },
    building_id: {
        type: String,
        required: true
    },
    entry_date: {
        type: Date,
        required: true
    },
    exit_date: {
        type: Date,
        required: true
    }
});

const ReservationDB = mongoose.model('reservations',schema);

module.exports = ReservationDB;