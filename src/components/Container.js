import React from 'react'
import '../styles/Container.css';
import Avatar from '@mui/material/Avatar';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Link } from 'react-router-dom';
import artworks from "../data/Listartworks.js"
import { useDispatch } from "react-redux";
import { deleteArtwork } from "../features/UploadImage.js";



const Container = () => {
    const dispatch = useDispatch();


    return (
        <div className='container' >

            {artworks.map((art, index) => (
                <Link to={`/artwork/${art.id}`} key={art.id}>
                    <div id={art.id} className={`artwork artwork-${index % 4}`}>
                        <img src={art.src} alt={art.src} />
                        <div className='overlay'>
                            <div className='save-btn' >Save</div>
                            <div className='hidden-tag' alt="Danhyeye"
                            ><HighlightOffIcon onClick={() => {
                                dispatch(deleteArtwork({ id: art.id }));
                            }} /></div>
                            <div className='avatar-user'><Avatar sx={{ width: 24, height: 24 }} /></div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}


export default Container;