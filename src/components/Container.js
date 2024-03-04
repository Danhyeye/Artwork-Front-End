import React, {useEffect} from 'react'
import '../styles/Container.css';
import Avatar from '@mui/material/Avatar';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {deleteArtwork} from "../features/artworks/ArtworksSlice";
import {addToCart} from "../features/carts/CartsSlice";
import {ArtworksThunk} from "../features/artworks/ArtworksThunk";
import {CartsThunk} from "../features/carts/CartsThunk";


const Container = () => {
    const dispatch = useDispatch();

    const artworks = useSelector((state) => state.artworks?.value);
    console.log(artworks)

    useEffect(() => {
        dispatch(ArtworksThunk.getAllArtworks());
    }, []);


    const handleAddToCart = async (artwork) => {
        dispatch(CartsThunk.addCart(artwork))
            .then(() => dispatch(addToCart(artwork)))
    }

    return (
        <div className='container'>
            {artworks?.map((art, index) => (
                <Link to={`/artwork/${art.id}`} key={art.id}>
                    <div id={art.id} className={`artwork artwork-${index % 4}`}>
                        <img src={art.src} alt={art.src}/>
                        <div className='overlay'>
                            <div className='save-btn' onClick={(e) => {
                                e.preventDefault();
                                handleAddToCart(art);
                            }}
                            >Save
                            </div>
                            <div className='hidden-tag' alt="Danhyeye"
                            ><HighlightOffIcon onClick={(e) => {
                                e.preventDefault();
                                dispatch(ArtworksThunk.deleteArtwork(art.id))
                                    .then(()=>dispatch(deleteArtwork(art.id)));
                            }}/></div>
                            <div className='avatar-user'><Avatar sx={{width: 24, height: 24}}/></div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}


export default Container;
