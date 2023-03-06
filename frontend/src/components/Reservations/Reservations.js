import React, { useState, useCallback } from 'react';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export default function Reservations() {
    const [reservations, setReservations] = useState([]);

    const getUserReservations = useCallback( async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
            };
            const response = await fetch('/userReservations', requestOptions);
            const data = await response.json();

            let arr = [];
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    const name = data[i].nameRoom;
                    const response2 = await fetch(`/getRoom/${name}`);
                    const data2 = await response2.json();
                    arr.push(data2);
                }
            }
            const finishData = data.map((arg, index) => ({ ...arg, ...arr[index] }));
            finishData.sort((a, b) => {
                return new Date(a.checkIn).valueOf() - new Date(b.checkIn).valueOf();
            });
            setReservations(finishData);
            console.log(finishData);
        } catch (error) {
            console.log(error);
        }
    },[]);

    React.useEffect(() => {
        getUserReservations();
        // eslint-disable-next-line
    }, []);

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'rgba(255,255,255,0.9)',
                mt: '20px',
                padding: '25px',
                borderRadius: '5px',
                boxShadow: '0 0 20px aliceblue',
            }}
        >
            <Typography variant="h2">Your reservations</Typography>
            {reservations.length === 0 && <CircularProgress size={50} />}
            {reservations?.map((myRes) => {
                return (
                    <Box
                        sx={{
                            width: '80%',
                            maxWidth: '80%',
                            bgcolor: 'rgba(255,255,255,0.7)',
                            margin: 'auto',
                            mt: '25px',
                            p: '10px',
                            borderRadius: '5px',
                            display: 'flex',
                            border: '1px solid gray',
                        }}
                    >
                        <Box
                            sx={{
                                width: '40%',
                                height: '100%',
                                minHeight: '200px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                            }}
                        >
                            <Typography variant="subtitle1">
                                Room: <b>{myRes.nameRoom}</b>
                            </Typography>
                            <Typography variant="subtitle1">
                                Check in:{' '}
                                <b>
                                    {new Date(myRes.checkIn).toLocaleDateString('pl-PL', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}
                                </b>
                            </Typography>
                            <Typography variant="subtitle1">
                                Check out:{' '}
                                <b>
                                    {new Date(myRes.checkOut).toLocaleDateString('pl-PL', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}
                                </b>
                            </Typography>
                            <Typography variant="subtitle1">
                                Date of booking:{' '}
                                <b>
                                    {new Date(myRes.dateOfMakeReservation).toLocaleDateString('pl-PL', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}
                                </b>
                            </Typography>
                        </Box>
                        <Box sx={{ width: '30%' }}></Box>
                        <Box
                            sx={{
                                width: '30%',
                                height: '100%',
                            }}
                        >
                            {' '}
                            <img src={myRes.imgLinks[0]} width="200px" height="200px" alt="Room" />{' '}
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
}
