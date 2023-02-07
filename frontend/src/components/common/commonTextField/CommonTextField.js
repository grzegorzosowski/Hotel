import React from "react";
import TextField from '@mui/material/TextField';

const CommonTextField = ({label, type, size, onChange}) => {
    return (
        <TextField fullWidth onChange={onChange}  type={type} label={label} size={size} id={label} sx={{mb: '20px'}}>
        </TextField>
    )
}

export default CommonTextField;