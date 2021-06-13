const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    family_name: {
        type: String,
        required: true
    },
    customer_name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
});

const CustomerDB = mongoose.model('customers',schema);

module.exports = CustomerDB;