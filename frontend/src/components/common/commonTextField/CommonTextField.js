import React from "react";
import TextField from '@mui/material/TextField';

const CommonTextField = ({label, type, size,}) => {
    return (
        <TextField fullWidth type={type} label={label} size={size} id={label} sx={{mb: '20px'}}>
        </TextField>
    )
}

export default CommonTextField;