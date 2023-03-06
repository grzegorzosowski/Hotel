import React from 'react';
import { Box} from '@mui/system';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

function HomePage() {
    const h = 8;
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'rgba(255,255,255,0.9)',
                mt: '20px',
                mb: '20px',
                padding: '25px',
                borderRadius: '5px',
                boxShadow: '0 0 20px aliceblue',
            }}
        >
            <Typography variant="h3" mt='40px'>Welcome to V&B Hotel!</Typography>
            <Box display="flex" width="60%" mt="50px">
                <Box width="40%">
                    <Typography variant="subtitle1">
                        We are thrilled to have you here and hope that you'll find everything you need to make your stay
                        with us a memorable one.
                    </Typography>
                </Box>
            </Box>
            <Divider sx={{color: 'black', width: '20%', mt: `${h}vh`, mb: `${h}vh`, bgcolor: 'rgba(0,0,0,0.3)'}}/>
            <Box display="flex" width="60%" justifyContent="right">
                <Box width="60%">
                    <Typography variant="subtitle1" textAlign='right'>
                        Our hotel is the perfect destination for anyone looking for a relaxing and comfortable vacation.
                        Whether you're traveling for business or pleasure, we offer a wide range of amenities and
                        services that are sure to make your stay enjoyable.
                    </Typography>
                </Box>
            </Box>
            <Divider sx={{color: 'black', width: '20%', mt: `${h}vh`, mb: `${h}vh`, bgcolor: 'rgba(0,0,0,0.3)'}}/>
            <Box display="flex" width="60%" justifyContent="left">
                <Box width="40%">
                    <Typography variant="subtitle1">
                        From our spacious and well-appointed rooms to our on-site restaurant and fitness center, we have
                        everything you need to make your stay with us a truly exceptional experience. We pride ourselves
                        on providing our guests with the highest level of service and attention to detail, so you can
                        rest assured that you'll be in good hands during your stay.
                    </Typography>
                </Box>
            </Box>
            <Divider sx={{color: 'black', width: '20%', mt: `${h}vh`, mb: `${h}vh`, bgcolor: 'rgba(0,0,0,0.3)'}}/>
            <Box display="flex" width="60%" justifyContent="right">
                <Box width="60%">
                    <Typography variant="subtitle1" textAlign='right'>
                        If you're ready to book your stay with us, we encourage you to use our easy-to-use online
                        reservation system. Simply select your dates, choose your room type, and you're all set! And if
                        you have any questions or need assistance with your booking, our friendly and knowledgeable
                        staff is always here to help.
                    </Typography>
                </Box>
            </Box>
            <Divider sx={{width: '20%', mt: `${h}vh`, mb: `${h}vh`, bgcolor: 'rgba(0,0,0,0.3)'}}/>
            <Box display="flex" width="60%" justifyContent="center">
                <Box width="60%">
                    <Typography variant="subtitle1">
                        If you're ready to book your stay with us, we encourage you to use our easy-to-use online
                        reservation system. Simply select your dates, choose your room type, and you're all set! And if
                        you have any questions or need assistance with your booking, our friendly and knowledgeable
                        staff is always here to help.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default HomePage;
