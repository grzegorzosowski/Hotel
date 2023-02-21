import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import CommonButton from '../common/CommonButton/CommonButton';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const password = useRef({});
    password.current = watch('userPassword', '');
    const validatePassword = (value) => {
        if (value === password.current) {
            return true;
        } else {
            return false;
        }
    };

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [failedMessage, setFailedMessage] = useState(false);
    const [userData, setUserData] = useState(null);

    const createUser = async (datas) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: datas,
            };
            const response = await fetch('/createUser', requestOptions);
            const data = await response.json();
            setUserData(data);
            if (!response.ok) {
                setFailedMessage(true);
                throw new Error(response.statusText);
            }
            setShowSuccessMessage(true);
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = (data) => {
        createUser(JSON.stringify(data));
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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
                {!showSuccessMessage && !failedMessage && (
                    <>
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
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <TextField
                                    fullWidth
                                    sx={{ mb: '20px' }}
                                    //onChange={(event) => setForm({ ...form, userName: event.target.value.trim() })}
                                    label="Name"
                                    type="text"
                                    size="small"
                                    inputProps={{ maxLength: 25 }}
                                    {...register('userName', {
                                        required: 'Name is required',
                                        max: 25,
                                        minLength: {
                                            value: 2,
                                            message: 'Name minimum length is 2',
                                        },
                                        maxLength: {
                                            value: 25,
                                            message: 'Name maximum length is 25',
                                        },
                                    })}
                                ></TextField>
                                <TextField
                                    fullWidth
                                    sx={{ mb: '20px' }}
                                    //value={form.userSurname}
                                    //onChange={(event) => setForm({ ...form, userSurname: event.target.value.trim() })}
                                    label="Surname"
                                    type="text"
                                    size="small"
                                    inputProps={{ maxLength: 25 }}
                                    {...register('userSurname', {
                                        required: 'Surname is required',
                                        max: 25,
                                        minLength: {
                                            value: 2,
                                            message: 'Surname minimum length is 2',
                                        },
                                        maxLength: {
                                            value: 25,
                                            message: 'Surname maximum length is 25',
                                        },
                                    })}
                                ></TextField>
                                <TextField
                                    fullWidth
                                    sx={{ mb: '20px' }}
                                    //value={form.userEmail}
                                    //onChange={(event) => setForm({ ...form, userEmail: event.target.value.trim() })}
                                    label="Email"
                                    size="small"
                                    {...register('userEmail', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: 'Entered email does not match to email format',
                                        },
                                    })}
                                ></TextField>
                                <FormControl
                                    sx={{ width: 1, mb: '20px' }}
                                    size="small"
                                    variant="outlined"
                                    id="password"
                                >
                                    <InputLabel htmlFor="outlined-adornment-password" id="password">
                                        Password
                                    </InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        //onChange={(event) => setForm({ ...form, userPassword: event.target.value })}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                        name="password"
                                        {...register('userPassword', {
                                            required: 'Password is required',
                                            minLength: 'Minimum password length is 8',
                                        })}
                                    />
                                </FormControl>
                                <FormControl
                                    sx={{ width: 1, mb: '20px' }}
                                    size="small"
                                    variant="outlined"
                                    id="password_repeat"
                                >
                                    <InputLabel htmlFor="outlined-adornment-password" id="password_repeat">
                                        Password Repeat
                                    </InputLabel>
                                    <OutlinedInput
                                        id="password_repeat"
                                        type={showPassword ? 'text' : 'password'}
                                        //onChange={(event) =>setForm({ ...form, userRepeatPassword: event.target.value })}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password Repeat"
                                        name="password_repeat"
                                        {...register('userRepeatPassword', {
                                            validate: validatePassword,
                                        })}
                                    />
                                </FormControl>
                                {errors && (
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        {errors?.userName && <span>{errors.userName.message}</span>}
                                        {errors?.userSurname && <span>{errors.userSurname.message}</span>}
                                        {errors?.userEmail && <span role="alert">{errors.userEmail.message}</span>}
                                        {errors?.userPassword && <span role="alert">{errors.userPassword.message}</span>}
                                        {errors?.userRepeatPassword && errors.userRepeatPassword.type === 'validate' && (
                                            <p>The passwords do not match.</p>
                                        )}
                                    </Box>
                                )}
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
                        </Box>
                    </>
                )}
                {!showSuccessMessage && failedMessage && <FailedMessage userData={userData.message}></FailedMessage>}
                {showSuccessMessage && !failedMessage && <SuccessMessage />}
            </Box>
        </>
    );

    function SuccessMessage() {
        return (
            <>
                <Box>Successfully signed up</Box>
                <Link style={{ textDecoration: 'none' }} to={`/Login`}>
                    Go to Log in
                </Link>
            </>
        );
    }

    function FailedMessage({ userData }) {
        const handleButton = () => {
            setFailedMessage(false);
            setShowSuccessMessage(false);
            console.log('Cofnięto');
        };
        return (
            <>
                <Box>{userData}</Box>
                <CommonButton onClick={handleButton}> Go back </CommonButton>
            </>
        );
    }
}
