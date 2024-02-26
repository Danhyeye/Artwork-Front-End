import React from 'react';
import { useParams } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import artworks from '../data/Listartworks';
import '../styles/Artwork.css';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Artwork = () => {
    const { id } = useParams();
    const thisArtwork = artworks.find(artwork => String(artwork.id) === id);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const ITEM_HEIGHT = 48;
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <main className='pin-container'>
                {thisArtwork && (
                    <div key={thisArtwork.id} className='artwork-item'>
                        <img src={thisArtwork.src} alt={`Artwork ${thisArtwork.id}`} />
                    </div>
                )}
                <div className='pin-title'>
                    <div className='pin-button'>
                        <LoyaltyIcon sx={{ fontSize: 30, m: 2, cursor: 'pointer' }} />
                        <MoreHorizIcon sx={{ fontSize: 30, m: 2, cursor: 'pointer' }} />
                        <div className='price'>{thisArtwork.price}</div>
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

                                <p>
                                    <IconButton
                                        aria-label="more"
                                        id="long-button"
                                        aria-controls={open ? 'long-menu' : undefined}
                                        aria-expanded={open ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        id="long-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'long-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        PaperProps={{
                                            style: {
                                                maxHeight: ITEM_HEIGHT * 4.5,
                                                width: '20ch',
                                            },
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>Update Comment</MenuItem>
                                        <MenuItem onClick={handleClose}>Delete Comment</MenuItem>
                                    </Menu>
                                </p>
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
        </>
    );
};

export default Artwork;
