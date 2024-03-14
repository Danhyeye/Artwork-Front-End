import React, {useEffect, useState} from 'react';
import '../styles/Cart.css';
import {Avatar} from '@mui/material';
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
import {useDispatch, useSelector} from 'react-redux';
import {CartsThunk} from '../features/carts/CartsThunk';
import {deleteFromCart} from "../features/carts/CartsSlice";
import {Link, Navigate, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {CartsService} from "../services/CartsService";
import {ArtworksService} from "../services/ArtworksService";

const Cart = () => {
    const carts = useSelector((state) => state.carts.value || {});

    const dispatch = useDispatch();
    const user = useSelector((state) => state.users?.value);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!user || !user.id) return;
        console.log(user, user?.id)
        dispatch(CartsThunk.getAllCarts(user.id));
    }, []);

    if (!user || !user.id) return <Navigate to={'/login'}/>
    const handleClickDelete = (cart) => {
        dispatch(CartsThunk.deleteCart(cart.id)).then(() => dispatch(deleteFromCart({id: cart.id})))
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
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );

    return (
        <>
            {
                carts.length > 0 ?
                    <Box sx={{
                        m: "auto",
                        mt: 16,
                        pb: 20,
                        maxWidth: "80%", // Giới hạn chiều rộng tối đa, giúp căn giữa khi kết hợp với margin
                        borderRadius: '16px', // Làm tròn góc
                        boxShadow: '1px 4px 12px rgba(0, 0, 0, 0.08)', // Thêm box shadow
                        overflow: 'hidden', // Ẩn overflow để bảo toàn border radius với thành phần con
                        position: 'relative'
                    }}>
                        {
                            carts.map((cart) =>
                                <div className='cart-container'>
                                    <div className='info-artwork'>
                                        <p className='title-artwork'>{cart.title}</p>
                                        <div className='artist'>
                                            <Avatar/>
                                            <p>{cart.artist}</p>
                                        </div>
                                    </div>
                                    <div className='amount-artwork'>
                                        <FormControl fullWidth sx={{width: 400, m: 2}}>
                                            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                startAdornment={<InputAdornment
                                                    position="start">{parseFloat(cart.price)}$</InputAdornment>}
                                                label="Amount" readOnly
                                            />
                                        </FormControl>
                                        <FormControl fullWidth sx={{width: 400, m: 2}}>
                                            <InputLabel htmlFor="outlined-adornment-amount">Tax</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                startAdornment={<InputAdornment
                                                    position="start">{`${parseFloat(cart.price * 0.2).toFixed(1)}$`}</InputAdornment>}
                                                label="Amount" readOnly
                                            />
                                        </FormControl>
                                        <FormControl fullWidth sx={{width: 400, m: 2}}>
                                            <InputLabel htmlFor="outlined-adornment-amount">Total</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                startAdornment={<InputAdornment
                                                    position="start">{`${(parseFloat(cart.price) + (parseFloat(cart.price) * 0.2)).toFixed(1)}$`}
                                                </InputAdornment>}
                                                label="Amount" readOnly
                                            />
                                        </FormControl>
                                    </div>
                                    <div className='image-artwork'>
                                        <img alt='image' src={cart.src}/>
                                    </div>
                                    <Button><CheckIcon/></Button>
                                    <Snackbar
                                        open={open}
                                        autoHideDuration={6000}
                                        onClose={handleClose}
                                        message="Success"
                                        action={action}
                                    />

                                    <Button onClick={() => handleClickDelete(cart)}><ClearIcon/></Button>
                                    <Snackbar
                                        open={open}
                                        autoHideDuration={6000}
                                        onClose={handleClose}
                                        message="Success"
                                        action={action}
                                    />
                                </div>
                            )
                        }
                        <Link to={'/payment'}>
                            <Button sx={{position: "absolute", bottom: 16, right: 16,px:4,py:2,borderRadius:4}} >Thanh toán</Button>
                        </Link>
                    </Box>
                    :
                    <div className='cart-container'>
                        <h1>No item in cart</h1>
                    </div>
            }
        </>
    );
};

export default Cart;
