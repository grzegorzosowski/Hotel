import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CommonButton from '../common/CommonButton/CommonButton';
import { FormHelperText, TextField } from '@mui/material';
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
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [failedMessage, setFailedMessage] = useState(false);
    const [userData, setUserData] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const onSubmit = async (formData) => {
        try {
            const { userRepeatPassword, ...toSend } = formData; //get required fields only, except userRepeatPassword
            const response = await fetch('/createUser', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(toSend),
            });
            setUserData(await response.json());
            if (!response.ok) {
                setFailedMessage(true);
                throw new Error(response.statusText);
            }
            setShowSuccessMessage(true);
        } catch (error) {
            console.error(error);
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <Container>
            {!showSuccessMessage && failedMessage ? (
                <FailedMessage
                    userData={userData.message}
                    handleButton={() => {
                        setFailedMessage(false); 
                        setShowSuccessMessage(false);
                    }}
                ></FailedMessage>
            ) : showSuccessMessage && !failedMessage ? (
                <SuccessMessage />
            ) : (
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
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <TextField
                            fullWidth
                            sx={{ mb: '20px' }}
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
                            helperText={errors?.userName?.message}
                            error={errors?.userName}
                        />
                        <TextField
                            fullWidth
                            sx={{ mb: '20px' }}
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
                            helperText={errors?.userSurname?.message}
                            error={errors?.userSurname}
                        />
                        <TextField
                            fullWidth
                            sx={{ mb: '20px' }}
                            label="Email"
                            size="small"
                            {...register('userEmail', {
                                required: 'Email is required',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Entered email does not match to email format',
                                },
                            })}
                            helperText={errors?.userEmail?.message}
                            error={errors?.userEmail}
                        />
                        <PasswordInput
                            title="Password"
                            showPassword={showPassword}
                            handleClickShowPassword={handleClickShowPassword}
                            error={errors?.userPassword?.message}
                            inputProps={register('userPassword', {
                                required: 'Password is required',
                                minLength: 'Minimum password length is 8',
                            })}
                        />
                        <PasswordInput
                            title="Password Repeat"
                            showPassword={showPassword}
                            handleClickShowPassword={handleClickShowPassword}
                            error={
                                errors?.userRepeatPassword &&
                                errors.userRepeatPassword.type === 'validate' &&
                                'The passwords are not the same.'
                            }
                            inputProps={register('userRepeatPassword', {
                                validate: (value) => value === watch('userPassword', ''),
                            })}
                        />
                        <CommonButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ px: 5, mt: 1 }}
                        >
                            Signup
                        </CommonButton>
                    </Box>
                </>
            )}
        </Container>
    );
}

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

function FailedMessage({ userData, handleButton }) {
    return (
        <>
            <Box>{userData}</Box>
            <CommonButton onClick={handleButton}> Go back </CommonButton>
        </>
    );
}

function Container({ children }) {
    return (
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
            {children}
        </Box>
    );
}

function PasswordInput({ title, showPassword, handleClickShowPassword, error, inputProps }) {
    return (
        <FormControl sx={{ width: 1, mb: '20px' }} size="small" variant="outlined">
            <InputLabel>{title}</InputLabel>
            <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                label={title}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={(event) => {
                                event.preventDefault();
                            }}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                error={Boolean(error)}
                {...inputProps}
            />
            {error && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
    );
}
