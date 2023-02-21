import Box from '@mui/material/Box';
import CommonTextField from '../common/commonTextField/CommonTextField';
import CommonButton from '../common/CommonButton/CommonButton';
import InputPassword from '../common/InputPassword';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useUser } from '../../UserProvider';
import { Button } from '@mui/material';

export default function Account() {
    const user = useUser();
    const [form, setForm] = useState({
        userName: user.name,
        userSurname: user.surname,
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [failedMessage, setFailedMessage] = useState(false);
    const [editUserData, setEditUserData] = useState(false);
    const [editUserPassword, setEditUserPassword] = useState(false);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(form),
    };

    const fetchEditUserData = async () => {
        try {
            await fetch('/editUserData', requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        setFailedMessage(true);
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                .catch(console.error('Error 404'));
            console.log('User has been edited');
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const fetchEditUserPass = async () => {
        try {
            if (form.userNewPassword === form.userRepeatPassword) {
                const response = await fetch('/editUserPassword', requestOptions);
                if (!response.ok) {
                    setFailedMessage(true);
                    throw new Error(response.statusText);
                }
                return response.json();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmitData = async (e) => {
        e.preventDefault();
        await fetchEditUserData();
    };

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        await fetchEditUserPass();
    };

    function handleEditData() {
        setEditUserData(true);
        setEditUserPassword(false);
    }

    function handleEditPassword() {
        setEditUserData(false);
        setEditUserPassword(true);
    }

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
                    Edit account
                </Typography>
                <Box
                    sx={{
                        width: 1,
                        maxWidth: '100%',
                        textAlign: 'center',
                    }}
                >
                    {!showSuccessMessage && !failedMessage && (
                        <>
                            <Button onClick={handleEditData}>Edit user</Button>
                            <Button onClick={handleEditPassword}>Edit password</Button>

                            {!editUserPassword && editUserData && (
                                <form onSubmit={handleSubmitData}>
                                    <CommonTextField
                                        value={form.userName}
                                        onChange={(event) => setForm({ ...form, userName: event.target.value.trim() })}
                                        label="Name"
                                        type="text"
                                        size="small"
                                    ></CommonTextField>
                                    <CommonTextField
                                        value={form.userSurname}
                                        onChange={(event) =>
                                            setForm({ ...form, userSurname: event.target.value.trim() })
                                        }
                                        label="Surname"
                                        type="text"
                                        size="small"
                                    ></CommonTextField>
                                    <CommonButton
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        sx={{ px: 5, mt: 1 }}
                                    >
                                        Save
                                    </CommonButton>
                                </form>
                            )}
                            {editUserPassword && !editUserData && (
                                <form onSubmit={handleSubmitPassword}>
                                    <InputPassword
                                        value={form.userOldPassword}
                                        onChange={(event) => setForm({ ...form, userOldPassword: event.target.value })}
                                        text={'Old Password'}
                                        id={'oldPassword'}
                                    ></InputPassword>
                                    <InputPassword
                                        value={form.userNewPassword}
                                        onChange={(event) => setForm({ ...form, userNewPassword: event.target.value })}
                                        text={'New Password'}
                                        id={'newPassword'}
                                    ></InputPassword>
                                    <InputPassword
                                        value={form.userRepeatPassword}
                                        onChange={(event) =>
                                            setForm({ ...form, userRepeatPassword: event.target.value })
                                        }
                                        text={'Repeat New Password'}
                                        id={'RepeatNewPassword'}
                                    ></InputPassword>
                                    <CommonButton
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        sx={{ px: 5, mt: 1 }}
                                    >
                                        Save
                                    </CommonButton>
                                </form>
                            )}
                        </>
                    )}
                    {!showSuccessMessage && failedMessage && <FailedMessage />}
                    {showSuccessMessage && !failedMessage && <SuccessMessage />}
                </Box>
            </Box>
        </>
    );
    function SuccessMessage() {
        return (
            <>
                <Box>Data edited succesfully</Box>
            </>
        );
    }

    function FailedMessage() {
        const handleButton = () => {
            setFailedMessage(false);
            setShowSuccessMessage(false);
            console.log('Cofnięto');
        };
        return (
            <>
                <Box>Something gone wrong</Box>
                <CommonButton onClick={handleButton}> Go back </CommonButton>
            </>
        );
    }
}
