import React from "react";
import './Room.css';

function Room(props) {
    return (
        <div className="single-room-box">
            <div className="room-img">Tu będzie zdjęcie</div>
            <div className="room-name">{props.name}</div>
            <div className="room-type">Typ: {props.type}</div>
            <div className="room-beds">Ilość miejsc: {props.beds}</div>
            <p className="room-description">Tu będzie krótki opis pokoju</p>
        </div>
    )
}

export default Room;