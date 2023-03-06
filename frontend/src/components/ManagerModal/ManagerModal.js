import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CommonButton from '../common/CommonButton/CommonButton';
import { useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
};

export default function ManagerModal({ children, sx, buttonText, onClose }) {
    const [open, setOpen] = useState(false);

    const handleOpen = async () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        onClose?.() 
    };

    return (
        <div>
            <CommonButton sx={sx} onClick={handleOpen}>
                {buttonText}
            </CommonButton>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>{ children }</Box>
                </Fade>
            </Modal>
        </div>
    );
}
