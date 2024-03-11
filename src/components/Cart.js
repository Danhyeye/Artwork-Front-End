import React, { useEffect, useState } from 'react';
import '../styles/Cart.css';
import { Avatar } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart } from '../features/carts/CartsSlice';
import { CartsThunk } from '../features/carts/CartsThunk';

const Cart = () => {
    const carts = useSelector((state) => state.carts.value || {});
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const handleClick = (art) => {
        dispatch(CartsThunk.deleteCart(art.id))
            .then(() => dispatch(deleteFromCart({ id: art.id })));
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button onClick={handleClose}>
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );


    useEffect(() => {
        dispatch(CartsThunk.getAllCarts());
    }, []);



    return (
        <>
            {
                carts.length > 0 ?
                    carts.map((art) =>
                        <div className='cart-container'>
                            <div className='info-artwork'>
                                <p className='title-artwork'>{art.title}</p>
                                <div className='artist'>
                                    <Avatar />
                                    <p>{art.artist}</p>
                                </div>
                            </div>

                            <div className='amount-artwork'>
                                <FormControl fullWidth sx={{ width: 400, m: 2 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        startAdornment={<InputAdornment position="start">{parseFloat(art.price)}$</InputAdornment>}
                                        label="Amount" readOnly
                                    />
                                </FormControl>
                                <FormControl fullWidth sx={{ width: 400, m: 2 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">Tax</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        startAdornment={<InputAdornment position="start">{`${parseFloat(art.price * 0.2).toFixed(1)}$`}</InputAdornment>}
                                        label="Amount" readOnly
                                    />
                                </FormControl>
                                <FormControl fullWidth sx={{ width: 400, m: 2 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">Total</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        startAdornment={<InputAdornment position="start">{`${(parseFloat(art.price) + (parseFloat(art.price) * 0.2)).toFixed(1)}$`}
                                        </InputAdornment>}
                                        label="Amount" readOnly
                                    />
                                </FormControl>
                            </div>
                            <div className='image-artwork'>
                                <img alt='image' src={art.src} />
                            </div>
                            <Button onClick={() => handleClick(art)}><CheckIcon /></Button>
                            <Snackbar
                                open={open}
                                autoHideDuration={6000}
                                onClose={handleClose}
                                message="Success"
                                action={action}
                            />

                            <Button onClick={() => handleClick(art)}><ClearIcon /></Button>
                            <Snackbar
                                open={open}
                                autoHideDuration={6000}
                                onClose={handleClose}
                                message="Success"
                                action={action}
                            />

                            {/* <button className='remove-artwork' onClick={
                                () => dispatch(CartsThunk.deleteCart(art.id))
                                    .then(() => dispatch(deleteFromCart({ id: art.id })))
                            }>
                                <ClearIcon />
                            </button> */}
                        </div>
                    ) :
                    <div className='cart-container'>
                        <h1>No item in cart</h1>
                    </div>
            }
        </>
    );
};

export default Cart;
