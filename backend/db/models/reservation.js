const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    bookedBy: {
        type: String,
        required: true,
    },
    nameRoom: {
        type: String,
        required: true,
    },
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    },
    dateOfMakeReservation: {
        type: Date,
        required: true,
    },
});

const Booking = mongoose.model('Reservation', ReservationSchema);

module.exports = Booking;
