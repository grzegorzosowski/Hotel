const mongoose = require('mongoose');

const Room = mongoose.model('Room', {
    type: String,
    name: String,
    beds: Number
});

module.exports = Room;