import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CommonTextField from '../common/commonTextField/CommonTextField';
import CommonButton from '../common/CommonButton/CommonButton';
import InputPassword from '../common/InputPassword';
import Typography from '@mui/material/Typography';

export default function Login() {
    const [form, setForm] = useState({});
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            username: form.userEmail,
            password: form.userPassword
        }),
    };

    const logUser = async () => {
        try {
            await fetch('http://localhost:3001/login/password', requestOptions).then((response) => {
                return response.json();
            });
        } catch (error) {
            console.error(error);
        }
        
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        logUser();
        console.log(form.userEmail + '  ' + form.userPassword);
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
                    <form onSubmit={handleSubmit}>
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
                    </form>
                </Box>
            </Box>
        </>
    );
}
