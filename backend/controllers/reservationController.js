const Reservation = require('../db/models/reservation');

class ReservationController {
    async createReservation(req, res) {
        const nameRoom = req.body.nameRoom;
        const dateIn = new Date(req.body.dateIn);
        const dateOut = new Date(req.body.dateOut);
        const bookInDay = 10;
        const bookOutDay = 20;
        let newReservation;
        try {
            newReservation = new Reservation({
                bookedBy: req.session.passport.user.uEmail,
                nameRoom: nameRoom,
                checkIn: dateIn,
                checkOut: dateOut,
                dateOfMakeReservation: new Date(),
            });
            const res = await newReservation.save();
            if (res) {
                console.log('Reservation saved');
            }
        } catch (error) {
            console.log(error);
            return res.status(404);
        }
        if (dateIn.getDate() >= bookInDay && dateIn.getDate() <= bookOutDay) {
            return res.status(201).json({ message: 'No available rooms in this date' });
        }
        return res.status(200).json({ message: 'Good, we have available room for you ;)' });
    }

    async checkIsRoomIsAvailable(req, res) {
        const nameRoom = req.body.nameRoom;
        const bookedDays = await Reservation.find({ nameRoom: nameRoom });
        const notAvailableDays = bookedDays.map((reservation) => ({
            checkIn: reservation.checkIn,
            checkOut: reservation.checkOut,
        }));
        console.log(notAvailableDays);
        return res.json(notAvailableDays);
    }
}

module.exports = new ReservationController();
