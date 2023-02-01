const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Room = require('../../db/models/room');

module.exports = {
    saveRoom(req, res) {
        const newRoom = new Room({
            type: 'Apartament',
            name: 'Orange Sky Small',
            beds: 2
        });
        newRoom.save().then(() => {
            console.log('Room has been saved')
        });
        
        const component = React.createElement('h1', null, 'Hello World xD');
        const html = ReactDOMServer.renderToString(component);

        res.send(html);
    }
}