import React from 'react';
import Room from './Room/Room';
import CommonButton from '../common/CommonButton/CommonButton';
import { useState } from 'react';
import { Box } from '@mui/material';
import BasicDatePicker from '../DatePicker/DatePicker';

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [dateIn, setDateIn] = useState(null);
    const [dateOut, setDateOut] = useState(null);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            dateIn: { day: dateIn.$D, month: dateIn.$M + 1, year: dateIn.$y },
            dateOut: { day: dateOut.$D, month: dateOut.$M + 1, year: dateOut.$y },
        }),
    };
    const fetchFindAvailableRooms = async () => {
        try {
            const response = await fetch('/availableRooms', requestOptions);
            const data = await response.json();
            setRooms(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = () => {
        console.log(dateIn.$D, '.', dateIn.$M + 1, '.', dateIn.$y);
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
                <BasicDatePicker onDateChange={handleDateInChange} />
                <BasicDatePicker onDateChange={handleDateOutChange} />
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
