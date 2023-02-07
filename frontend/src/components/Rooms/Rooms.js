import React from "react";
import "./Rooms.css";
import Room from "./Room/Room";

import { Box } from "@mui/material";

export default function Rooms() {
    const [rooms, setRooms] = React.useState([]);
    React.useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch("/getAllRoom");
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRooms();
    }, []);

    return (
        <Box sx={{ width: 1, boxSizing: "border-box" }}>
            <h1>Nasze pokoje</h1>
            {rooms.map((room) => (
                <Room key={room.name} name={room.name} type={room.type} beds={room.beds} />
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
    );
}
