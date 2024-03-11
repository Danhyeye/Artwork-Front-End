import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import artworks from '../data/Listartworks';
import '../styles/Header.css';

const Header = ({ badgeCount }) => {
    const location = useLocation();
    const shouldShowHeader = !['/login', '/signup'].includes(location.pathname);

    // State to track if the user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to handle successful login
    const handleLogin = () => {
        // Assuming some logic to authenticate the user
        // After successful authentication, update the isLoggedIn state
        setIsLoggedIn(true);
    };

    return shouldShowHeader ? (
        <div className="navbar">
            <div className="logo-bar">
                <Link to={'/home'}>
                    <img className="logo" src="assets/images/logo.png" alt="logo" />
                </Link>
                <Link to={'/home'}>
                    <button className="home" alt="home">
                        Home
                    </button>
                </Link>
                <Link to={'/upload'}>
                    <button className="create" alt="create">
                        Create
                    </button>
                </Link>
            </div>
            <div className="search-bar">
                <Stack spacing={2} sx={{ width: 800, alignContent: 'center', p: 1.5 }}>
                    <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={artworks.map((option) => option.topic)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={<SearchIcon />}
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                    sx: {
                                        borderRadius: 10,
                                    },
                                }}
                            />
                        )}
                    />
                </Stack>
            </div>
            <div className="info">
                <button className="btn-nofi">
                    <TuneIcon />
                </button>
                <Link to={'/cart'}>
                    <button className="btn-chat">
                        <ShoppingBagIcon />
                    </button>
                </Link>
                {/* Conditionally render either the login button or the image based on the isLoggedIn state */}
                {isLoggedIn ? (
                    <Link to="/profile">
                        <img
                            className="login-image"
                            src="/assets/images/avatar.png"
                            alt="User"
                        />
                    </Link>
                ) : (
                    <Link to={'/login'}>
                        <button className="login" onClick={handleLogin}>
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </div>
    ) : null;
};

export default Header;
