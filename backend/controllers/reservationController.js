const Reservation = require('../db/models/reservation');
const Room = require('../db/models/room');
const User = require('../db/models/user');

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

    //This function is looking for reservations between dateIn and dateOut, and return array of nameRoom of already booked rooms,
    //then query to find free rooms is generating
    async checkReservation(req, res) {
        const dateIn = new Date(req.body.dateIn);
        console.log('🚀 ~ file: reservationController.js:44  ~ dateIn:', dateIn);
        const dateOut = new Date(req.body.dateOut);
        console.log('🚀 ~ file: reservationController.js:46  ~ dateOut:', dateOut);

        const finishData = await Reservation.find(
            {
                $or: [
                    { $and: [{ checkIn: { $gte: dateIn } }, { checkOut: { $lte: dateOut } }] },
                    { $and: [{ checkIn: { $lt: dateIn } }, { checkOut: { $gt: dateOut } }] },
                    { $and: [{ checkIn: { $gte: dateIn } }, { checkIn: { $lte: dateOut } }] },
                    { $and: [{ checkOut: { $gte: dateIn } }, { checkOut: { $lte: dateOut } }] },
                ],
            },
            { nameRoom: 1 }
        );
        console.log(finishData);
        if (finishData.length > 0) {
            const reservationQuery = (finishData) => {
                const finalQuery = finishData.map((reservation) => {
                    return { name: { $ne: reservation.nameRoom } };
                });
                return finalQuery;
            };
            const myFinalfinishData = await Room.find({ $and: reservationQuery(finishData) });
            return res.status(200).json(myFinalfinishData);
        } else {
            const allRoom = await Room.find();
            return res.status(200).json(allRoom);
        }
    }

    async userReservations(req, res) {
        const userReservation = await Reservation.find({
            $and: [{ bookedBy: { $eq: req.session.passport.user.uEmail } }, { checkOut: { $gte: new Date() } }],
        }).lean();

        let arr = [];
        if (userReservation.length > 0) {
            for (let i = 0; i < userReservation.length; i++) {
                const name = userReservation[i].nameRoom;
                const roomData = await Room.find({ name: name }).lean();
                arr.push(roomData[0]);
            }
        }
        const finishData = userReservation.map((arg, index) => ({ ...arg, ...arr[index] }));
        finishData.sort((a, b) => {
            return new Date(a.checkIn).valueOf() - new Date(b.checkIn).valueOf();
        });
        return res.json(finishData);
    }

    async manageReservations(req, res) {
        const finishData = await Reservation.find();
        return res.json(finishData);
    }

    async deleteReservation(req, res) {
        const finishData = await Reservation.deleteOne({ _id: req.body.reservationID });
        return res.status(200).json(finishData);
    }
}

module.exports = new ReservationController();
