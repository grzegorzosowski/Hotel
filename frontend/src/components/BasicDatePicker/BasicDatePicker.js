import * as React from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker({ onDateChange, disableDates, labelText, today }) {
    const [value, setValue] = React.useState(new Date(today));

    function shouldDisableDate(day) {
        if (!disableDates || disableDates.length === 0) {
            return false;
        } else {
            for (let i = 0; i < disableDates.length; i++) {
                const disableRangeStart = new Date(disableDates[i].checkIn);
                const disableRangeEnd = new Date(disableDates[i].checkOut);
                if (day.add(1, 'day') >= disableRangeStart && day.add(1, 'day') <= disableRangeEnd) {
                    return true;
                }
            }

            return false;
        }
    }

    const handleDateChange = (newValue) => {
        setValue(newValue);
        onDateChange(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ mx: '10px', my: '50px' }}>
                <DatePicker
                    label={labelText}
                    //inputFormat='DD/MM/YYYY'
                    //views={['day', 'month']}
                    value={value}
                    shouldDisableDate={shouldDisableDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    disableHighlightToday={true}
                    disablePast={true}
                    autoOk={true}
                />
            </Box>
        </LocalizationProvider>
    );
}
