import React from "react";
import Box from "@mui/material/Box";

import CommonTextField from "../common/commonTextField/CommonTextField";
import CommonButton from "../common/CommonButton/CommonButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function Contact({ asd }) {
    return (
        <Box
            sx={{
                mt: 12,
                width: 3 / 10,
                minWidth: "240px",
                padding: 3,
                display: {
                    xs: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "rgba(240, 248, 255, 1)",
                    boxShadow: "0 0 20px aliceblue",
                    borderRadius: 5,
                },
            }}
        >
            <Box
                sx={{
                    width: 1,
                    maxWidth: "100%",
                    textAlign: "center",
                }}
            >
                <Typography variant="h4" gutterBottom>
                    {" "}
                    Send us a message
                </Typography>
                <form>
                    <CommonTextField label="Email" type="email" size="small"></CommonTextField>
                    <TextField fullWidth multiline rows={5} label="Message" size="small">
                        {" "}
                    </TextField>
                    <CommonButton type="submit" variant="contained" color="primary" size="large" sx={{ px: 5, mt: 3 }}>
                        Send
                    </CommonButton>
                </form>
            </Box>
        </Box>
    );
}

export default Contact;
