const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    inDay: {
        type: Date,
        required: true
    }
});

const Room = mongoose.model('Room', BookingSchema);

module.exports = Room;