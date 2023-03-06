import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CommonButton from '../common/CommonButton/CommonButton';
import ManagerModal from '../ManagerModal/ManagerModal';

export default function Manager() {
    const [rows, setRows] = useState([]);
    const [succes, setSucces] = useState(false);
    const fetchReservations = useCallback(async () => {
        try {
            const response = await fetch('/manageReservations');
            const data = await response.json();
            console.log(data);
            data.sort((a, b) => {
                return new Date(a.checkIn).valueOf() - new Date(b.checkIn).valueOf();
            });
            setRows(data);
        } catch (error) {}
    }, []);

    useEffect(() => {
        fetchReservations();
    }, [fetchReservations]);

    const onDelete = async (ID) => {
        try {
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    reservationID: ID,
                }),
            };
            const response = await fetch('/deleteReservation', requestOptions);
            const data = response.json();
            console.log('Deleted room', data);
            if (data) {
                setSucces(true);
            }
        } catch (error) {}
    };

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
            <Typography sx={{ mb: '15px' }} variant="h4">
                Active reservations
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <b>Room</b>
                            </TableCell>
                            <TableCell align="right">
                                <b>Check in</b>
                            </TableCell>
                            <TableCell align="right">
                                <b>Check out</b>
                            </TableCell>
                            <TableCell align="right">
                                <b>User email</b>
                            </TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.roomName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    <i>{row.nameRoom}</i>
                                </TableCell>
                                <TableCell align="right">
                                    {new Date(row.checkIn).toLocaleDateString('pl-PL', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}
                                </TableCell>
                                <TableCell align="right">
                                    {new Date(row.checkOut).toLocaleDateString('pl-PL', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}
                                </TableCell>
                                <TableCell align="right">{row.bookedBy}</TableCell>
                                <TableCell align="right">
                                    <ManagerModal
                                        sx={{ color: 'red' }}
                                        buttonText="DELETE"
                                        succes={succes}
                                        setSucces={setSucces}
                                        onClose={() => {
                                            fetchReservations();
                                            setTimeout(() => {setSucces(false);}, 200);
                                        }}
                                    >
                                        {!succes ? (
                                            <>
                                                {' '}
                                                <Typography>
                                                    Confirm deleting <b>{row.bookedBy}</b> reservation
                                                </Typography>
                                                <CommonButton
                                                    onClick={() => onDelete(row._id)}
                                                    variant="contained"
                                                    color="error"
                                                    sx={{ mt: '20px' }}
                                                >
                                                    DELETE
                                                </CommonButton>
                                            </>
                                        ) : (
                                            <Box>Deleted successfully</Box>
                                        )}
                                    </ManagerModal>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
