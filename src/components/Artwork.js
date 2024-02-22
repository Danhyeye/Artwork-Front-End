import React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import '../styles/Artwork.css';
import { productsAPI, useGetAllProductQuery } from '../features/productsAPI';



const Artwork = () => {
    const { data, error, isLoading } = useGetAllProductQuery();
    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>An error occurred...</p>;
    }

    else {
        return (


            <>
                <main className='pin-container'>
                    {data?.map(product => (
                        <div key={product.id} className='pin-container'>
                            {product && (
                                <div className='artwork-item'>
                                    <img src={product.src} alt={`Artwork ${product.id}`} />
                                </div>
                            )}
                            <h1>{productsAPI}</h1>
                            <div className='pin-title'>
                                <div className='pin-button'>
                                    <LoyaltyIcon sx={{ fontSize: 30, m: 2, cursor: 'pointer' }} />
                                    <MoreHorizIcon sx={{ fontSize: 30, m: 2, cursor: 'pointer' }} />
                                    <div className='price'>{product.price}</div>
                                    <button className='save-button'>Save</button>
                                </div>
                                <div className='comment-container'>
                                    <div className='title'>{product.title}</div>
                                    <div className='topic' readonly>
                                        <TextField readOnly label={product.topic} InputProps={{ readOnly: true }} />
                                    </div>

                                    <div>
                                        <div className='user'>
                                            <Avatar sx={{ fontSize: 30, m: 2, cursor: 'pointer' }} />
                                            <div className='user-follower'>
                                                <p className='artist'>{product.artist}</p>
                                            </div>
                                        </div>
                                        <div className='content'>
                                            <p className='text-description'>Description</p>
                                            <p className='description'>{product.description}</p>
                                        </div>
                                        <p className='text-comment'>Comment</p>

                                        <div className='comments'>
                                            <Avatar sx={{ fontSize: 30, m: 2, cursor: 'pointer' }} />
                                            <div className='reply-comment'>
                                                <p className='user-comment'>User name</p>
                                                <p className='timestamp'>Today</p>
                                            </div>
                                            <p className='comment-text'>Danhyeyee</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='ur-comment'>
                                    <div className='react'>
                                        <p className='think'>What do you think?</p>
                                        <button className='like' sx={{ ":active": { color: "red[500]" } }}>
                                        </button>
                                    </div>
                                    <div className='add-comment'>
                                        <Avatar sx={{ fontSize: 40, m: 2, cursor: 'pointer' }} />
                                        <Box
                                            component="form"
                                            sx={{
                                                '& > :not(style)': { m: 2, width: '25ch' },
                                            }}
                                            noValidate
                                            autoComplete="off"
                                        />
                                        <TextField label="Add a comment" variant="outlined" sx={{ width: 360, height: 35, marginBottom: 2.5 }} />
                                        <button className='send-button'><SendIcon /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </main>
                <div className='other-artworks'>
                    <p className='text-other-artworks'>More to explore artworks</p>
                </div>
            </>
        );
    };
}

export default Artwork;


{/* <>
    <main className='pin-container' >

        {thisArtwork && (
            <div className='artwork-item'>
                <img src={thisArtwork.src} alt={`Artwork ${thisArtwork.id}`} />
            </div>
        )}
        <div className='pin-title'>
            <div className='pin-button'>
                <LoyaltyIcon sx={{ fontSize: 30, m: 2, cursor: 'pointer' }} />
                <MoreHorizIcon sx={{ fontSize: 30, m: 2, cursor: 'pointer' }} />
                <div className='price' >{thisArtwork.price}</div>
                <button className='save-button'>Save</button>
            </div>
            <   div className='comment-container'>
                <div className='title'>
                    {thisArtwork.title}
                </div>
                <div className='topic' readonly><TextField readOnly label={thisArtwork.topic} InputProps={{ readOnly: true }} /></div>

                <div>
                    <div className='user'>
                        <Avatar sx={{ fontSize: 30, m: 2, cursor: 'pointer' }} />
                        <div className='user-follower'>
                            <p className='artist'>{thisArtwork.artist}</p>

                        </div>

                    </div>
                    <div className='content'>
                        <p className='text-description'>Description</p>
                        <p className='description'>{thisArtwork.description}</p>
                    </div>
                    <p className='text-comment'>Comment</p>


                    <div className='comments'>
                        <Avatar sx={{ fontSize: 30, m: 2, cursor: 'pointer' }} />
                        <div className='reply-comment'>
                            <p className='user-comment'>User name</p>
                            <p className='timestamp'>Today</p>
                        </div>

                        <p className='comment-text'>Danhyeyee</p>
                    </div>


                </div>
            </div>
            <div className='ur-comment'>
                <div className='react'>
                    <p className='think'>What do you think?</p>
                    <button className='like' sx={{ ":active": { color: "red[500]" } }}>
                        
                    </button>
                </div>
                <div className='add-comment'>
                    <Avatar sx={{ fontSize: 40, m: 2, cursor: 'pointer' }} />
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 2, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    />
                    <TextField label="Add a comment" variant="outlined" sx={{ width: 360, height: 35, marginBottom: 2.5 }} />
                    <button className='send-button'><SendIcon /></button>
                </div>
            </div>
        </div>
    </main>
    <div className='other-artworks'>
        <p className='text-other-artworks'>More to explore artworks</p>
    </div>
</> */}