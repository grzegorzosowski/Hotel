import React from 'react';
import Box from '@mui/material/Box';

import CommonTextField from "../common/commonTextField/CommonTextField";
import CommonButton from "../common/CommonButton/CommonButton";
import InputPassword from "../common/InputPassword";
import Typography from '@mui/material/Typography';



function Signup() {
    return (
        <>
         <Box sx={{
                    mt: 12,
                    width: 3/10,
                    minWidth: '240px',
                    padding: 3,
                    display: { 
                        xs: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'rgba(240, 248, 255, 1)',
                        boxShadow: '0 0 20px aliceblue',
                        borderRadius: 5,
                    }
                }}
                >
                    <Typography variant="h4" gutterBottom> Create account</Typography>
                    <Box
                        sx={{
                            width: 1,
                            maxWidth: '100%',
                            textAlign: 'center',
                        }}
                        >
                        <form>
                            <CommonTextField label='Name' type='text' size='small'></CommonTextField>
                            <CommonTextField label='Surname' type='text' size='small'></CommonTextField>
                            <CommonTextField label='Email' type='Email' size='small'></CommonTextField>
                            <InputPassword></InputPassword>
                            <CommonButton type='submit' variant='contained' color='primary' size='large' sx={{px: 5, mt: 1}}>Signup</CommonButton>
                        </form>
                    </Box>
                </Box>
        </>
    )
}

export default Signup;