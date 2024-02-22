import React from 'react'
import '../styles/Container.css';
import Avatar from '@mui/material/Avatar';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Link } from 'react-router-dom';
// import artworks from '../data/Listartworks';
import products from '../data/Listartworks';



const Container = () => {

    return (
        <div className='container' >
            { }
            {products.map((art, index) => (
                <Link to={`/artwork/${art.id}`} >
                    <div id={art.id} className={`artwork artwork-${index % 4}`}>
                        <img src={art.src} alt={art.src} />

                        <div className='overlay'>
                            <div className='save-btn' >Save</div>
                            <div className='hidden-tag' alt="Danhyeye"><HighlightOffIcon /></div>
                            <div className='avatar-user'><Avatar sx={{ width: 24, height: 24 }} /></div>
                        </div>
                    </div></Link>
            ))}
        </div>
    )
}


export default Container;