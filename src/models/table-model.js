const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    tableNo: {
        type: Number,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true
    },
    bookedBy: {
        type: String,
        required: true,
        default: 'Not booked!'           //Value of this field will be Not bboked by default.As soon as a user books it,It will be changed
    },
    bookedFor: {
        type: String,

    }
})

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;