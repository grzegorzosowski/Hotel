import * as React from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker(props) {
  const [value, setValue] = React.useState(null);

  const handleDateChange = (newValue) => {
    setValue(newValue);
    props.onDateChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{mx: '10px', my: '50px'}}>
          <DatePicker
            label="Basic example"
            //inputFormat='DD/MM/YYYY'
            views={['day', 'month']}
            value={value}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
            showDaysOutsideCurrentMonth
          />
      </Box>
    </LocalizationProvider>
  );
}