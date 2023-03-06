import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BookModal from '../../BookModal/BookModal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Room({imgUrls, name, type, beds}) {
    const links = imgUrls;
    console.log("🚀 ~ file: Room.js:13 ~ Room ~ links:", links)
    
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <>
            <Box
                sx={{
                    padding: '75px 20px',
                    height: '600px',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    mt: '20px',
                    mb: '50px',
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    borderRadius: '5px',
                }}
            >
                <Box
                    sx={{
                        width: '40%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h3" mb={'20px'}>
                        {name}
                    </Typography>
                    <Typography variant="body1" my="10px">
                        <b>Class:</b> {type}
                    </Typography>
                    <Typography variant="body1" my="10px">
                        <b>Sleeps up to:</b> {beds}
                    </Typography>
                    <Typography variant="body2">
                        Veniam aliquip duis aute adipisicing ipsum consectetur sint culpa. Esse ut ullamco amet irure.
                        Laborum sunt qui dolor sit ad nostrud sit sit adipisicing fugiat veniam proident aliqua. Culpa
                        quis officia aute incididunt sunt culpa dolore fugiat sint culpa aliqua. Aute exercitation
                        deserunt labore cupidatat qui. Fugiat eiusmod dolor elit labore fugiat id proident sunt
                        cupidatat occaecat duis duis. Consectetur ullamco duis nulla dolor.
                    </Typography>
                    <BookModal nameRoom={name}></BookModal>
                </Box>
                <Box sx={{ width: '50%', textAlign: 'center' }}>
                    <Slider {...settings}>
                        {links &&
                        links.map((link, index) => (
                            <Box>
                            <img key={index} src={link} height="450px" alt={`Number ${index}`} />
                        </Box>
                        ))}
                        
                    </Slider>
                </Box>
            </Box>
        </>
    );
}

export default Room;
