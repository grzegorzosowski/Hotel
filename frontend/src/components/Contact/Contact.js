import React, { useState } from 'react';
import Box from '@mui/material/Box';

import CommonTextField from '../common/commonTextField/CommonTextField';
import CommonButton from '../common/CommonButton/CommonButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function Contact() {
    const [form, setForm] = useState({});
    const [messageSent, setMessageSent] = useState(false);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(form),
    };

    const sendMessage = async () => {
        const response = await fetch('/sendMessage', requestOptions);
        if (response.ok) {
            setMessageSent(true);
            console.log(response.status);
        } else console.log('No response');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendMessage();
    };
    return (
        <>
            <Box
                sx={{
                    mt: 12,
                    width: 3 / 10,
                    minWidth: '240px',
                    padding: 3,
                    display: {
                        xs: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'rgba(240, 248, 255, 1)',
                        boxShadow: '0 0 20px aliceblue',
                        borderRadius: 5,
                    },
                }}
            >
                <Box
                    sx={{
                        width: 1,
                        maxWidth: '100%',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        {' '}
                        Send us a message
                    </Typography>
                    {!messageSent && (
                        <Box component="form" onSubmit={handleSubmit}>
                            <CommonTextField
                                onChange={(event) => setForm({ ...form, userEmail: event.target.value.trim() })}
                                label="Email"
                                type="email"
                                size="small"
                            ></CommonTextField>
                            <TextField
                                onChange={(event) => setForm({ ...form, userMessage: event.target.value })}
                                fullWidth
                                multiline
                                rows={5}
                                label="Message"
                                size="small"
                            >
                                {' '}
                            </TextField>
                            <CommonButton
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{ px: 5, mt: 3 }}
                            >
                                Send
                            </CommonButton>
                        </Box>
                    )}
                    {messageSent && <Typography>Message has been sent</Typography>}
                </Box>
            </Box>
        </>
    );
}

export default Contact;
