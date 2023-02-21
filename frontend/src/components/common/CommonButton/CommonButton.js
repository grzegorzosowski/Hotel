import React from 'react';
import Button from '@mui/material/Button';

const CommonButton = ({ children, size, variant, color, type, sx, onClick }) => {
    return (
        <Button onClick={onClick} size={size} variant={variant} color={color} type={type} sx={sx}>
            {children}
        </Button>
    );
};

export default CommonButton;
