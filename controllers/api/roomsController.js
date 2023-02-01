const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Room = require('../../db/models/room');

class RoomController { 
    createRoom(req, res) {
        const typeRoom = req.body.typeRoom;
        const nameRoom = req.body.nameRoom;
        const bedsRoom = req.body.bedsRoom;
        const newRoom = new Room({
            type: typeRoom,
            name: nameRoom,
            beds: bedsRoom
        });
        newRoom.save().then(() => {
            console.log('Room has been saved')
        });
        
        // const component = React.createElement('h1', null, 'Utworzono Pokój typu: ' + typeRoom);
        // const html = ReactDOMServer.renderToString(component);

        res.send('Stworzono pokój typu: ' + typeRoom + " o nazwie " + nameRoom + " z ilością łóżek " + bedsRoom);
    }
    getRoom(req, res) {

        res.send('Pobrano Pokój')
    }
    editRoom(req, res) {

        res.send('Zaktualizowano Pokój')
    }
    deleteRoom(req, res) {
        const id = req.params.id;
        res.send('Usunięto Pokój o ID ' + id);
    }
}

module.exports = new RoomController();