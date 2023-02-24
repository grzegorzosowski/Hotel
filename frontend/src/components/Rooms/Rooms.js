import React from 'react';
import Room from './Room/Room';
import CommonButton from '../common/CommonButton/CommonButton';
import { useState } from 'react';
import { Box } from '@mui/material';
import BasicDatePicker from '../DatePicker/DatePicker';

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [firstLoad, setFirstLoad] = useState(false);
    const [dateIn, setDateIn] = useState(null);
    const [dateOut, setDateOut] = useState(null);
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

    React.useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('/getAllRoom');
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error(error);
            }
        };
        if (!firstLoad) {
            fetchRooms();
        } else {
            setFirstLoad(true);
        }
        if (firstLoad) {
            setRooms([]);
        }
    }, [firstLoad]);

    const fetchFindAvailableRooms = async () => {
        try {
            const response = await fetch('/checkReservation', requestOptions);
            const data = await response.json();
            console.log('🚀 ~ file: Rooms.js:44', data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = () => {
        fetchFindAvailableRooms();
    };

    const handleDateInChange = (newValue) => {
        setDateIn(newValue);
    };

    const handleDateOutChange = (newValue) => {
        setDateOut(newValue);
    };

    return (
        <Box sx={{ width: 1, boxSizing: 'border-box' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.8)' }}>
                {/* <BasicDatePicker onDateChange={handleDateInChange} labelText='Check in' />
                <BasicDatePicker onDateChange={handleDateOutChange} labelText='Check out'  /> */}
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
                <Room key={room.name} name={room.name} type={room.type} beds={room.beds} />
            ))}

        </Box>
    );
}
