import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CommonButton from '../common/CommonButton/CommonButton';
import { Typography } from '@mui/material';
import BasicDatePicker from '../DatePicker/DatePicker';
import { useState } from 'react';
import { useUser } from '../../UserProvider';
import { Link, useLocation } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
};

export default function BookModal({ nameRoom }) {
    const user = useUser();
    const isLogged = !!user;
    const [open, setOpen] = useState(false);
    const [dateIn, setDateIn] = useState(new Date());
    const [dateOut, setDateOut] = useState(new Date().setDate(new Date().getDate() + 1));
    const [successMessage, setSuccessMessage] = useState(false);
    const [disableDates, setDisableDates] = useState({});
    const [dateIncorrect, setDateIncorrect] = useState(false);
    const location = useLocation();
    const requestReservationOptions = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            nameRoom: nameRoom,
            dateIn: dateIn,
            dateOut: dateOut,
        }),
    };
    const requestAvailableOptions = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            nameRoom: nameRoom,
        }),
    };

    React.useEffect(() => {
        if (new Date(dateIn) > new Date(dateOut).setDate(new Date(dateOut).getDate() - 1)) {
            setDateIncorrect(true);
        } else {
            setDateIncorrect(false);
        }
        console.log('Date incorect: ', dateIncorrect);
    });

    const fetchCheckIsRoomIsAvailable = async () => {
        const response = await fetch('/checkIsRoomIsAvailable', requestAvailableOptions);
        if (response) console.log('WE GOT RESPONSE');
        const notAvailableDays = await response.json();
        setDisableDates(notAvailableDays);
        // console.log("🚀 ~ file: BookModal.js:58 ~ fetchCheckIsRoomIsAvailable ~ notAvailableDays:", notAvailableDays)
        console.log('DIASBLEDATES after SET: ', disableDates);

        return notAvailableDays;
    };

    const fetchCreateReservation = async () => {
        try {
            const response = await fetch('/createReservation', requestReservationOptions);
            if (response.status === 200) {
                setSuccessMessage(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDateInChange = (newValue) => {
        setDateIn(newValue);
    };

    const handleDateOutChange = (newValue) => {
        setDateOut(newValue);
    };

    const handleSearch = () => {
        if(!dateIncorrect) {
          fetchCreateReservation();
        } 
        
    };

    const handleOpen = async () => {
        setSuccessMessage(false);
        await fetchCheckIsRoomIsAvailable();
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    sessionStorage.setItem('previousLocation', location.pathname);

    return (
        <div>
            <CommonButton variant={'contained'} onClick={handleOpen}>
                Book
            </CommonButton>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {!successMessage ? (
                            <>
                                <Typography variant="h5">
                                    {' '}
                                    You are booking <b>{nameRoom}</b> room{' '}
                                </Typography>
                                <Typography variant="subtitle1"> Select date check in and check out </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <BasicDatePicker
                                        onDateChange={handleDateInChange}
                                        disableDates={disableDates}
                                        labelText="Check in"
                                        today={new Date()}
                                    />
                                    <BasicDatePicker
                                        onDateChange={handleDateOutChange}
                                        disableDates={disableDates}
                                        labelText="Check out"
                                        today={new Date().setDate(new Date().getDate() + 1)}
                                    />
                                </Box>
                                {dateIncorrect && <Box>Check out date must be at least 1 day after check in</Box>}
                                {isLogged ? (
                                    <CommonButton
                                        onClick={handleSearch}
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        size="medium"
                                        sx={{ px: 5, py: 1 }}
                                    >
                                        Confirm book
                                    </CommonButton>
                                ) : (
                                    <Box>
                                        Please,{' '}
                                        <Link style={{ textDecoration: 'none', color: 'blue' }} to={`/Login`}>
                                            SIGN IN
                                        </Link>{' '}
                                        to book
                                    </Box>
                                )}
                            </>
                        ) : (
                            <div>Booked succesfully</div>
                        )}
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
