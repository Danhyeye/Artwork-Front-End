import React, { Component } from 'react'
import artworks from '../data/Listartworks.json';
import '../styles/Cart.css';
import { Avatar } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';


export default class Cart extends Component {
    render() {
        return (
            <>
                <div className='cart-container'>
                    <div className='info-artwork'>
                        <p className='title-artwork'>Danhyeye</p>
                        <div className='artist'>
                            <Avatar src={artworks.src} />

                            <p>name</p>
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
                        <img src='assets/images/img8.jpg' alt='assets/images/img8.jpg' />
                    </div>
                    <button className='payment'><CheckIcon /></button>
                    <button className='remove-artwork'><ClearIcon /></button>
                </div>
            </>

        )
    }
}
