import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import "../styles/Artwork.css";
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../features/carts/CartsSlice";
import { ArtworksService } from "../services/ArtworksService";
import { CartsThunk } from "../features/carts/CartsThunk";
import { ArtworksThunk } from "../features/artworks/ArtworksThunk";
import { deleteArtwork } from "../features/artworks/ArtworksSlice";
import { CommentsService } from "../services/CommentsService";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { stringAvatar } from "../utils/string";
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import Typography from "@mui/material/Typography";

import DeleteIcon from '@mui/icons-material/Delete';

const Artwork = () => {
    const { id } = useParams();
    const [thisArtwork, setThisArtwork] = useState();

    useEffect(() => {
        (async () => {
            await ArtworksService.getArtwork(id).then((art) => {
                if (art.id !== undefined) {
                    setThisArtwork(art);
                    window.scrollTo(0, 0); // Scroll to top when data is loaded
                }
            });
        })();
    }, [id]);




    const user = useSelector((state) => state.users?.value);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const ITEM_HEIGHT = 48;
    const open = Boolean(anchorEl);
    const [comments, setComments] = useState([])
    const dispatch = useDispatch();
    const [myComments, setMyComments] = useState("");
    const [selectedComment, setSelectedComment] = useState({});
    const [updateFlag, setUpdateFlag] = useState(false);
    const carts = useSelector((state) => state.carts?.value || []);

    useEffect(() => {
        CommentsService.getCommentsByArtworkId(id).then((comments) => {
            setComments(comments)
        })
    }, [])
    const handlePostComment = (content) => {
        if (!user || !user.id) return;
        const comment = {
            user_id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            artworkId: id,
            comment: myComments,
            date: new Date()
        };
        setComments(prev => [...prev, comment]);
        setMyComments("")

        CommentsService.postComment(comment).then((res) => {
            console.log(res)
        })
    }
    const handleUpdateComment = (id) => {
        if (!user || !user.id) return;
        const comment = {
            comment: myComments,
            id
        };
        setComments(prev => prev.map(cmt => cmt.id === id ? { ...cmt, comment: myComments } : cmt));
        setMyComments("")
        CommentsService.updateComment(comment).then((res) => {
            console.log(res)
        })
    }
    const handleDeleteComment = (id) => {
        setComments(prev => prev.filter((comment) => comment.id !== id))
        CommentsService.deleteComment(id).then((res) => {
            console.log(res)
        })
    }
    const handleOpenUpdate = () => {
        setUpdateFlag(true);
    };
    const handleCloseUpdate = () => {
        setUpdateFlag(false);
    };
    const handleChangeComment = (event) => {
        setMyComments(event.target.value);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleAddToCart = useCallback(async (artworkId, created_by) => {
        if (!user || !user.id) {
            handleClickOpen();
            setAlertContent("Please log in to be able to perform this action")
            return;
        }
        if (carts.find(cart => cart.artworkId === artworkId)) {
            handleClickOpen();
            setAlertContent("Artwork is already in the cart")
            return;
        }
        if (user.id !== created_by) {
            const cart = {
                userId: user.id,
                artworkId
            }
            dispatch(addToCart(cart))
            dispatch(CartsThunk.addCart(cart))
        }
    }, [carts, user, dispatch]);

    const [openDialog, setOpenDialog] = React.useState(false);
    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSaved = (artworkId) => {
        if (user && user.id)
            ArtworksService.saveArtwork(user.id, artworkId)
                .then((res) => {
                    if (res.message === "Artwork already saved")
                        handleClickAlert()
                })
                .catch(() => {
                    handleClickAlert()
                });
        else handleClickOpen()
    }

    const [openAlert, setOpenAlert] = useState(false);

    const handleClickAlert = () => {
        console.log("alert")
    };

    const navigate = useNavigate()
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    console.log("thisArtwork", thisArtwork)
    const [alertContent, setAlertContent] = useState("Please log in to be able to perform this action")
    return (
        <>
            <main className="pin-container" sx={{ height: '90vh' }}>
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Add Artwork  ?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {alertContent}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={handleCloseDialog} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>

                {thisArtwork && (
                    <div key={thisArtwork.id} className="artwork-item">
                        <img src={thisArtwork.src} alt={`Artwork ${thisArtwork.id}`} />
                    </div>
                )}
                <Box className="pin-title">
                    {thisArtwork && (
                        <div className="pin-button">
                            <LoyaltyIcon
                                sx={{ fontSize: 30, m: 2, cursor: "pointer" }}
                                onClick={() => handleAddToCart(thisArtwork.id, thisArtwork.created_by)}
                            />
                            {
                                user.id === thisArtwork.created_by && (
                                    <DeleteIcon
                                        sx={{ fontSize: 30, mr: 4, cursor: "pointer" }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (window.confirm("Are you sure you want to delete this artwork?")) {
                                                dispatch(ArtworksThunk.deleteArtwork(thisArtwork.id)).then(() => {
                                                    dispatch(deleteArtwork(thisArtwork.id))
                                                    navigate("/")
                                                })
                                            }
                                        }}
                                    />
                                )
                            }

                            <div className="price">{parseFloat(thisArtwork.price)}$</div>
                            <div className='save-btn' onClick={(e) => {
                                e.preventDefault();
                                handleSaved(id);
                            }}
                            >Save
                            </div>
                        </div>
                    )}
                    <div className="comment-container">
                        {thisArtwork && (
                            <>
                                <div className="title">{thisArtwork.title}</div>
                                <div className="topic" readOnly>
                                    {thisArtwork.topics.map(topic => topic.name).join(', ')}
                                </div>
                                <div>
                                    <div className="user">
                                        <Avatar {...stringAvatar(thisArtwork?.first_name + " " + thisArtwork?.last_name)}
                                            sx={{
                                                width: 40, height: 40, fontSize: 18,
                                                m: 2
                                            }} />
                                        <div className="user-follower">
                                            <p className="artist">{thisArtwork.first_name + " " + thisArtwork.last_name}</p>
                                        </div>
                                    </div>

                                    <div className="content">
                                        <p className="text-description">Description</p>
                                        <p className="description">{thisArtwork.description}</p>
                                    </div>

                                    <p className="text-comment">Comment</p>

                                    <CommentSection comments={comments} handleDeleteComment={handleDeleteComment}
                                        setMyComments={setMyComments}
                                        user={user} setUpdateFlag={setUpdateFlag}
                                        setSelectedComment={setSelectedComment} />

                                    <div className="ur-comment">
                                        <div className="react">
                                            <p className="think">What do you think?</p>
                                            <button
                                                className="like"
                                                sx={{ ":active": { color: "red[500]" } }}
                                            ></button>
                                        </div>
                                        <div className="add-comment">
                                            <Avatar {...stringAvatar(myComments?.first_name + " " + myComments?.last_name)}
                                                sx={{
                                                    width: 40, height: 40, fontSize: 18,
                                                    m: 2
                                                }} />
                                            <Box
                                                component="form"
                                                sx={{
                                                    "& > :not(style)": { m: 2, width: "25ch" },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                            />

                                            {updateFlag ? (
                                                <form
                                                    onSubmit={() => {
                                                        handleUpdateComment(selectedComment.id);
                                                        setUpdateFlag(false);
                                                    }}
                                                >
                                                    <TextField
                                                        label="Update comment"
                                                        variant="outlined"
                                                        sx={{ width: 360, height: 35, marginBottom: 2.5 }}
                                                        value={myComments}
                                                        onChange={handleChangeComment}
                                                    />
                                                    <button className="send-button" type="submit">
                                                        <SendIcon />
                                                    </button>
                                                    <button
                                                        style={{ marginLeft: "10px" }}
                                                        onClick={handleCloseUpdate}
                                                    >
                                                        Cancel
                                                    </button>
                                                </form>
                                            ) : (
                                                <form
                                                    onSubmit={handlePostComment}
                                                >
                                                    <TextField
                                                        label="Add a comment"
                                                        variant="outlined"
                                                        sx={{ width: 360, height: 35, marginBottom: 2.5 }}
                                                        value={myComments}
                                                        onChange={handleChangeComment}
                                                    />
                                                    <button className="send-button" type="submit">
                                                        <SendIcon />
                                                    </button>
                                                </form>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </Box>
            </main>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openAlert}
                autoHideDuration={2000}
                onClose={handleCloseAlert}
            >
                <Alert onClose={handleCloseAlert} severity="warning">
                    You have saved this Artwork!
                </Alert>
            </Snackbar>
            <div className="other-artworks">
                <p className="text-other-artworks">More to explore artworks</p>
            </div>
        </>
    )
}


function CommentSection({ comments, user, handleDeleteComment, setUpdateFlag, setSelectedComment, setMyComments }) {

    const stringAvatar = (name) => {
        return {
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    };

    return (
        <Box sx={{
            maxHeight: '260px', // Đặt chiều cao tối đa cho Box
            overflowY: 'scroll', // Thêm thanh cuộn theo chiều dọc nếu nội dung vượt quá chiều cao tối đa
            '&::-webkit-scrollbar': {
                width: '0.4em'
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,.1)',
                outline: '1px solid slategrey'
            }
        }}>
            {comments.map((comment) => (
                <Box key={comment.id} id={comment.id} sx={{
                    my: 2,
                    p: 2,
                    ml: 2,
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                        <Box sx={{ display: 'flex', alignItems: "center" }}>
                            <Avatar {...stringAvatar(user?.first_name + " " + user?.last_name)}
                                sx={{ width: 40, height: 40, fontSize: 18, mr: 2 }} />
                            <Box>
                                <Typography sx={{
                                    fontWeight: 'bold',
                                    color: '#333',
                                    mb: 0.5
                                }}>{comment.first_name + " " + comment.last_name}</Typography>
                                <Typography sx={{ color: '#666', fontSize: '0.875rem' }}>
                                    {formatDistanceToNow(new Date(comment.date), { addSuffix: true, locale: vi })}
                                </Typography>
                            </Box>
                        </Box>
                        {comment.user_id === user.id && (
                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: "10px" }}>
                                <Button variant="text" size="small" color="error"
                                    onClick={() => handleDeleteComment(comment.id)}>
                                    Delete
                                </Button>
                                <Button variant="text" size="small" color="primary" onClick={() => {
                                    setUpdateFlag(true);
                                    setSelectedComment(comment);
                                    setMyComments(comment.comment);
                                }}>
                                    Update
                                </Button>
                            </Box>
                        )}
                    </Box>

                    <Typography sx={{ mt: 1.5, color: '#444', fontSize: '0.975rem' }}>
                        {comment.comment}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}

export default Artwork;
