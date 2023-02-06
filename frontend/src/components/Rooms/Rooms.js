import React from "react";
import './Rooms.css';
import Room from './Room/Room';

import { Box } from "@mui/material";

class Rooms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [ 
            ]
        }
    }
    // First load of component
    componentDidMount() {
        this.fetchRooms();
    }

    // get all rooms when component is loading and update 'state'
    async fetchRooms() {
        try {
            const response = await fetch('http://localhost:3001/getAllRoom');
            const data = await response.json();
            this.setState({ rooms: data });
        } catch (error) {
            console.error(error);
        }
    }
    
    render() {
        return (
            <Box sx={{width: 1, boxSizing: 'border-box' }}>
                <h1>Nasze pokoje</h1>
                {this.state.rooms.map(room => (
                   <Room  
                        key={room.name} 
                        name={room.name}
                        type={room.type}
                        beds={room.beds}
                    />  
                ))}
            </Box>
            
            // <div className="rooms-box">
            //     <p>Lista pokoi:</p>
            //     {this.state.rooms.map(room => (
            //        <Room  
            //             key={room.name} 
            //             name={room.name}
            //             type={room.type}
            //             beds={room.beds}/> 
            //     ))}
            // </div>
        )
    }
}

export default Rooms;