import React from "react";
import Button from "@mui/material/Button";

export default function CommonButton({ children, size, variant, color, type, sx }) {
    return (
        <Button size={size} variant={variant} color={color} type={type} sx={sx}>
            {children}
        </Button>
    );
}
