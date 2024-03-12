import React, { useEffect } from 'react'
import '../styles/Cart.css';
import { Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import artworks from '../data/Listartworks';
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../features/carts/CartsSlice";
import { CartsThunk } from "../features/carts/CartsThunk";

const Cart = () => {
    const { id } = useParams();
    const products = artworks.find((art) => String(art.id) === id);

    const carts = useSelector((state) => state.carts.value || []);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(CartsThunk.getAllCarts());
    }, [])

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
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        label="Amount" readOnly
                                    />
                                </FormControl>
                                <FormControl fullWidth sx={{ width: 400, m: 2 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">Tax</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        label="Amount" readOnly
                                    />
                                </FormControl>
                                <FormControl fullWidth sx={{ width: 400, m: 2 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">Total</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        label="Amount" readOnly
                                    />
                                </FormControl>
                            </div>
                            <div className='image-artwork'>
                                <img alt='image' src={art.src} />
                            </div>
                            <button className='payment'><CheckIcon /></button>
                            <button className='remove-artwork' onClick={
                                () => dispatch(CartsThunk.deleteCart(art.id))
                                    .then(() => dispatch(deleteFromCart({ id: art.id })))
                            }>
                                <ClearIcon />
                            </button>
                        </div>
                    ) :
                    <div className='cart-container'>
                        <h1>No item in cart</h1>
                    </div>
            }
        </>

    )
}

export default Cart;
