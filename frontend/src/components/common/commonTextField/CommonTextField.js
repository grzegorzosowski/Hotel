import React from "react";
import TextField from "@mui/material/TextField";

export default function CommonTextField({ label, type, size }) {
    return <TextField fullWidth type={type} label={label} size={size} id={label} sx={{ mb: "20px" }}></TextField>;
}
