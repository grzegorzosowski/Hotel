import React from 'react';
import Room from './Room/Room';
import CommonButton from '../common/CommonButton/CommonButton';
import { useState } from 'react';
import { Box } from '@mui/material';
import BasicDatePicker from '../BasicDatePicker/BasicDatePicker';

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [firstLoad, setFirstLoad] = useState(false);
    const [dateIn, setDateIn] = useState(new Date());
    const [dateOut, setDateOut] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
    const [dateIncorrect, setDateIncorrect] = useState(false);
    

    React.useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('/getAllRoom');
                const data = await response.json();
                setRooms(data);
                setFirstLoad(true);
            } catch (error) {
                console.error(error);
            }
        };
        if (!firstLoad) {
            fetchRooms();
        }
    }, [firstLoad, dateIn, dateOut]);

    const fetchFindAvailableRooms = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    dateIn: dateIn,
                    dateOut: dateOut,
                }),
            };
            const response = await fetch('/checkReservation', requestOptions);
            const data = await response.json();
            console.log('🚀 ~ file: Rooms.js:44', data);
            setRooms(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = () => {
        setDateIncorrect(false);
        if (new Date(dateIn).setHours(0, 0, 0, 0) >= new Date(dateOut).setHours(0, 0, 0, 0)) {
            setDateIncorrect(true);
        } else {
            fetchFindAvailableRooms();
        }
    };

    const handleDateInChange = (newValue) => {
        setDateIn(newValue);
    };

    const handleDateOutChange = (newValue) => {
        setDateOut(newValue);
    };

    return (
        <Box sx={{ width: 1, boxSizing: 'border-box' }}>
            <Box mt={'20px'} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '5px' }}>
                <BasicDatePicker onDateChange={handleDateInChange} labelText="Check in" today={dateIn} />
                <BasicDatePicker
                    onDateChange={handleDateOutChange}
                    labelText="Check out"
                    today={dateOut}
                    error={dateIncorrect}
                />
                <CommonButton
                    onClick={handleSearch}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ px: 5, my: '60px' }}
                >
                    Find
                </CommonButton>
            </Box>
            {rooms.map((room) => (
                <Room key={room.name} name={room.name} type={room.type} beds={room.beds} imgUrls={room.imgLinks}/>
            ))}
        </Box>
    );
}
