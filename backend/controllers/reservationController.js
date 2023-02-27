const Reservation = require('../db/models/reservation');
const Room = require('../db/models/room');

class ReservationController {
    async createReservation(req, res) {
        const nameRoom = req.body.nameRoom;
        const dateIn = new Date(req.body.dateIn);
        const dateOut = new Date(req.body.dateOut);
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

    async checkReservation(req, res) {
        const dateIn = new Date(req.body.dateIn);
        const dateOut = new Date(req.body.dateOut);
        const response = await Reservation.find(
            { $and: [{ checkIn: { $lte: dateIn } }, { checkOut: { $gte: dateOut } }] },
            { nameRoom: 1 }
        );
        console.log(response);
        if (response.length > 0) {
            const reservationQuery = (response) => {
                const finalQuery = response.map((reservation) => {
                    return { name: { $ne: reservation.nameRoom } };
                });
                return finalQuery;
            };
            const myFinalResponse = await Room.find({ $and: reservationQuery(response) });
            return res.status(200).json(myFinalResponse);
        } else {
            const allRoom = await Room.find();
            return res.status(200).json(allRoom);

        }

    }
}

module.exports = new ReservationController();
