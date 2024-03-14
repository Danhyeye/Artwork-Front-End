import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import "../styles/Artwork.css";
import {useDispatch, useSelector} from "react-redux"
import {addToCart} from "../features/carts/CartsSlice";
import {ArtworksService} from "../services/ArtworksService";
import {CartsThunk} from "../features/carts/CartsThunk";
import {ArtworksThunk} from "../features/artworks/ArtworksThunk";
import {deleteArtwork} from "../features/artworks/ArtworksSlice";
import {CommentsService} from "../services/CommentsService";
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import {stringAvatar} from "../utils/string";
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

const Artwork = () => {
    const {id} = useParams();
    const [thisArtwork, setThisArtwork] = useState();

    useEffect(() => {
        (async () => {
            await ArtworksService.getArtwork(id).then((art) => {
                if (art.id !== undefined)
                    setThisArtwork(art)
            });
        })();
    }, []);

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
            userId: user.id,
            artworkId: id,
            comment: myComments
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
        setComments(prev => prev.map(cmt => cmt.id === id ? {...cmt, comment: myComments} : cmt));
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
            setAlertContent("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng")
            return;
        }
        if (carts.find(cart => cart.artworkId === artworkId)) {
            handleClickOpen();
            setAlertContent("Artwork đã có trong giỏ hàng")
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

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const [alertContent, setAlertContent] = useState("Vui lòng đăng nhập để có thể thực hiện chức năng này")
    return (
        <>
            <main className="pin-container">
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Thêm Artwork vào giỏ hàng ?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {alertContent}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Bỏ qua</Button>
                        <Button onClick={handleCloseDialog} autoFocus>
                            Đồng ý
                        </Button>
                    </DialogActions>
                </Dialog>

                {thisArtwork && (
                    <div key={thisArtwork.id} className="artwork-item">
                        <img src={thisArtwork.src} alt={`Artwork ${thisArtwork.id}`}/>
                    </div>
                )}
                <div className="pin-title">
                    {thisArtwork && (
                        <div className="pin-button">
                            <LoyaltyIcon
                                sx={{fontSize: 30, m: 2, cursor: "pointer"}}
                                onClick={() => handleAddToCart(thisArtwork.id, thisArtwork.created_by)}
                            />
                            <MoreHorizIcon
                                sx={{fontSize: 30, m: 2, cursor: "pointer"}}
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(ArtworksThunk.deleteArtwork(thisArtwork.id)).then(() =>
                                        dispatch(deleteArtwork(thisArtwork.id))
                                    );
                                }}
                            />
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
                                        <Avatar {...stringAvatar(user?.first_name + " " + user?.last_name)}
                                                sx={{
                                                    width: 40 , height: 40 , fontSize: 18,
                                                    m:2
                                                }}/>
                                        <div className="user-follower">
                                            <p className="artist">{thisArtwork.first_name + " " + thisArtwork.last_name}</p>
                                        </div>
                                    </div>

                                    <div className="content">
                                        <p className="text-description">Description</p>
                                        <p className="description">{thisArtwork.description}</p>
                                    </div>

                                    <p className="text-comment">Comment</p>
                                    {comments.map((comment) => (
                                        <div className="comments" key={comment.id} id={comment.id}>
                                            <Avatar {...stringAvatar(user?.first_name + " " + user?.last_name)}
                                                    sx={{
                                                        width: 40 , height: 40 , fontSize: 18,
                                                        m:2
                                                    }}/>
                                            <div className="reply-comment">
                                                <p className="user-comment">{comment.first_name + " " + comment.last_name}</p>
                                                <p className="timestamp">{
                                                    formatDistanceToNow(new Date(comment.date), { addSuffix: true, locale: vi })
                                                }</p>
                                            </div>

                                            <p className="comment-text">{comment.comment}</p>

                                            {
                                                comment.user_id === user.id && (
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            gap: "10px",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                cursor: "pointer",
                                                                color: "red",
                                                                fontSize: "14px",
                                                            }}
                                                            onClick={() => handleDeleteComment(comment.id)}
                                                        >
                                                            Delete
                                                        </div>
                                                        <div
                                                            style={{
                                                                cursor: "pointer",
                                                                color: "blue",
                                                                fontSize: "14px",
                                                            }}
                                                            onClick={() => {
                                                                setUpdateFlag(true);
                                                                setSelectedComment(comment);
                                                                setMyComments(comment.comment);
                                                            }}
                                                        >
                                                            Update
                                                        </div>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    ))}
                                    <div className="ur-comment">
                                        <div className="react">
                                            <p className="think">What do you think?</p>
                                            <button
                                                className="like"
                                                sx={{":active": {color: "red[500]"}}}
                                            ></button>
                                        </div>
                                        <div className="add-comment">
                                            <Avatar sx={{fontSize: 40, m: 2, cursor: "pointer"}}/>
                                            <Box
                                                component="form"
                                                sx={{
                                                    "& > :not(style)": {m: 2, width: "25ch"},
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
                                                        sx={{width: 360, height: 35, marginBottom: 2.5}}
                                                        value={myComments}
                                                        onChange={handleChangeComment}
                                                    />
                                                    <button className="send-button" type="submit">
                                                        <SendIcon/>
                                                    </button>
                                                    <button
                                                        style={{marginLeft: "10px"}}
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
                                                        sx={{width: 360, height: 35, marginBottom: 2.5}}
                                                        value={myComments}
                                                        onChange={handleChangeComment}
                                                    />
                                                    <button className="send-button" type="submit">
                                                        <SendIcon/>
                                                    </button>
                                                </form>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
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
                    Bạn đã lưu Artwork này rồi!
                </Alert>
            </Snackbar>
            <div className="other-artworks">
                <p className="text-other-artworks">More to explore artworks</p>
            </div>
        </>
    )
}

export default Artwork;
