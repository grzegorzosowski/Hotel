const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Room = require('../db/models/room');

class RoomController { 
    //create room
    async createRoom(req, res) {
        const typeRoom = req.body.typeRoom;
        const nameRoom = req.body.nameRoom;
        const bedsRoom = req.body.bedsRoom;
        let newRoom;
        try{
            newRoom = new Room({
                type: typeRoom,
                name: nameRoom,
                beds: bedsRoom
            });
            await newRoom.save().then(() => {
                console.log('Room has been saved')
            });
        } catch(err) {
            return res.status(422).json({message: err.message});
        }

        res.status(201).json(newRoom);
    }

    //get all rooms
    async getAllRoom(req, res) {
        let doc;
        const name = req.params.nameRoom;
        try {
            doc = await Room.find({name: name});
        } catch (err){
            console.log(err);
            return res.status(500).json({message: err.message});

        }
        console.log(doc);
        res.status(200).json(doc);
    }
    
    //get room
    async getRoom(req, res) {
        const name = req.params.nameRoom;
        const doc = await Room.findOne({name: name});
        console.log(name);
        console.log(doc);
        res.status(200).json(doc);
    }

    // edit Room
    async editRoom(req, res) {
        const id = req.params.id;
        const name = req.body.name;
        const type = req.body.type;
        const beds = req.body.beds;

        try{
            const newRoom = await Room.findOne({_id: id});
            if(!newRoom) {
                return res.status(404).json({message: 'There is no document with the given ID'});
            }
        } catch (err) {
            return res.status(500).json({message: err.message});
        }

        newRoom.type = type;
        newRoom.name = name;
        newRoom.beds = beds;
        await newRoom.save();
        
        res.status(201).json(newRoom);
    }

    //delete Room
    async deleteRoom(req, res) {
        const id = req.params.id;
        let room;
        try {
            room = await Room.findOne({_id: id});
            if(!room) {
                return res.status(404).json({message: "There is no document with the given ID"})
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({message: err.message});
        }

        try {
            await Room.deleteOne({_id: id});
            return res.status(204).json({message: "Room deleted succesfully!"});
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
        
        
    }
}

module.exports = new RoomController();