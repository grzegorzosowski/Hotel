import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CommonTextField from '../common/commonTextField/CommonTextField';
import CommonButton from '../common/CommonButton/CommonButton';
import InputPassword from '../common/InputPassword';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';

export default function Login() {
    const [form, setForm] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            username: form.userEmail,
            password: form.userPassword,
        }),
    };

    const logUser = async () => {
        try {
            const res = await fetch('/login/password', requestOptions);
            const success = res.status === 200;
            if (success) {
                await fetch('/user', { method: 'get' });
                window.location.replace('/Rooms');
            } else {
                enqueueSnackbar('Wrong password', { variant: 'error' });
            }
        } catch (error) {
            console.log('Some error during logging');
            console.error(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        logUser();
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
                <Typography variant="h4" gutterBottom>
                    Log in
                </Typography>
                <Box
                    sx={{
                        width: 1,
                        maxWidth: '100%',
                        textAlign: 'center',
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit}>
                        <CommonTextField
                            value={form.userEmail}
                            onChange={(event) => setForm({ ...form, userEmail: event.target.value })}
                            label="Email"
                            type="email"
                            size="small"
                        ></CommonTextField>
                        <InputPassword
                            value={form.userPassword}
                            onChange={(event) => setForm({ ...form, userPassword: event.target.value })}
                            text={'Password'}
                        ></InputPassword>
                        <CommonButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ px: 5, mt: 3 }}
                        >
                            Login
                        </CommonButton>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
