import React from 'react'
// import algoliasearch from 'algoliasearch/lite'; 
// import { InstantSearch } from 'react-instantsearch';
// import { RefinementList } from './RefinementList';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Link, useLocation } from "react-router-dom";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import artworks from '../data/Listartworks.json';
import '../styles/Header.css';

const Header = () => {
    console.log('first')
    const location = useLocation();
    const shouldShowHeader = !['/login', '/signup'].includes(location.pathname);


    return shouldShowHeader ? (

        <div className='navbar'>
            <div className='logo-bar'>
                <Link to={"/home"}><img className='logo' src='assets/images/logo.png' alt='logo'></img></Link>
                <Link to={"/home"}><button className='home' alt='home'>Home</button></Link>
                <Link to={"/upload"}><button className='create' alt='create'>Create</button></Link>
            </div>
            <div className='search-bar'>
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

            <div className='info'>
                <button className='btn-nofi' ><TuneIcon /></button>
                <Link to={"/cart"}><button className='btn-chat'><ShoppingBagIcon /></button></Link>
                <Link to={"/login"}><button className='login'>Login</button></Link>
            </div>
        </div>

    ) : null;
};
export default Header;
