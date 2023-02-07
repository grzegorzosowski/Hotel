import React from "react";
import "./Room.css";
//import Grid from '@mui/material/Unstable_Grid2';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import logo from "./room1.jpeg";

export default function Room(props) {
    return (
        <>
            <Box
                sx={{
                    padding: "75px 20px",
                    height: "600px",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-evenly",
                }}
            >
                <Box
                    sx={{
                        width: "40%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h3" mb={"20px"}>
                        {props.name}
                    </Typography>
                    <Typography variant="body1" my="10px">
                        <b>Class:</b> {props.type}
                    </Typography>
                    <Typography variant="body1" my="10px">
                        <b>Sleeps up to:</b> {props.beds}
                    </Typography>
                    <Typography variant="body2">
                        Veniam aliquip duis aute adipisicing ipsum consectetur sint culpa. Esse ut ullamco amet irure.
                        Laborum sunt qui dolor sit ad nostrud sit sit adipisicing fugiat veniam proident aliqua. Culpa
                        quis officia aute incididunt sunt culpa dolore fugiat sint culpa aliqua. Aute exercitation
                        deserunt labore cupidatat qui. Fugiat eiusmod dolor elit labore fugiat id proident sunt
                        cupidatat occaecat duis duis. Consectetur ullamco duis nulla dolor.
                    </Typography>
                </Box>
                <Box sx={{ width: "50%" }}>
                    <img src={logo} width="600px" height="600px" alt="Room" />
                </Box>
            </Box>
        </>

        // <div className="single-room-box">
        //     <div className="room-img">Tu będzie zdjęcie</div>
        //     <div className="room-name">{props.name}</div>
        //     <div className="room-type">Typ: {props.type}</div>
        //     <div className="room-beds">Ilość miejsc: {props.beds}</div>
        //     <p className="room-description">Tu będzie krótki opis pokoju</p>
        // </div>
    );
}
