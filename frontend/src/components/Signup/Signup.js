import React, { useState } from 'react';
import Box from '@mui/material/Box';

import CommonTextField from '../common/commonTextField/CommonTextField';
import CommonButton from '../common/CommonButton/CommonButton';
import InputPassword from '../common/InputPassword';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [form, setForm] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(form),
    };

    const fetchUser = async () => {
        try {
            await fetch('http://localhost:3001/createUser', requestOptions).then((response) => response.json());
            setShowSuccessMessage(true);
        } catch (error) {
            console.error(error);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchUser();
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
                    {' '}
                    Create account
                </Typography>
                <Box
                    sx={{
                        width: 1,
                        maxWidth: '100%',
                        textAlign: 'center',
                    }}
                >
                    {!showSuccessMessage && (
                        <form onSubmit={handleSubmit}>
                            <CommonTextField
                                value={form.userName}
                                onChange={(event) => setForm({ ...form, userName: event.target.value.trim() })}
                                label="Name"
                                type="text"
                                size="small"
                            ></CommonTextField>
                            <CommonTextField
                                value={form.userSurname}
                                onChange={(event) => setForm({ ...form, userSurname: event.target.value.trim() })}
                                label="Surname"
                                type="text"
                                size="small"
                            ></CommonTextField>
                            <CommonTextField
                                value={form.userEmail}
                                onChange={(event) => setForm({ ...form, userEmail: event.target.value.trim() })}
                                label="Email"
                                type="Email"
                                size="small"
                            ></CommonTextField>
                            <InputPassword
                                value={form.userPassword}
                                onChange={(event) => setForm({ ...form, userPassword: event.target.value })}
                                text={'Password'}
                            ></InputPassword>
                            <InputPassword
                                value={form.userRepeatPassword}
                                onChange={(event) => setForm({ ...form, userRepeatPassword: event.target.value })}
                                text={'Repeat_password'}
                            ></InputPassword>
                            <CommonButton
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{ px: 5, mt: 1 }}
                            >
                                Signup
                            </CommonButton>
                        </form>
                    )}
                    {showSuccessMessage && <SuccessMessage />}
                </Box>
            </Box>
        </>
    );
}

function SuccessMessage() {
    return (
        <>
            <Box>You have been succesfully registered</Box>
            <Link style={{ textDecoration: 'none' }} to={`/`}>
                Go to home page{' '}
            </Link>
        </>
    );
}
