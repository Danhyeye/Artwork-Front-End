import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const FullScreenLoader = ({ isOpen }) => {

    return (
        <Backdrop  open={isOpen}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default FullScreenLoader;
