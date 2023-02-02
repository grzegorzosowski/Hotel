import React from "react";
import './Rooms.css';
import Room from './Room/Room';

class Rooms extends React.Component {
    constructor(props) {
        super(props);

        this.rooms = [
            {
                type: 'Economic',
                name: 'Blue Sky',
                beds: 4
            },
            {
                type: 'Business',
                name: 'Pleasure',
                beds: 2
            }
        ]
    }
    
    render() {
        return (
            <div className="rooms-box">
                <p>Lista pokoi:</p>
                {this.rooms.map(room => (
                   <Room  
                        name={room.name}
                        type={room.type}
                        beds={room.beds}/> 
                ))}
            </div>
        )
    }
}

export default Rooms;