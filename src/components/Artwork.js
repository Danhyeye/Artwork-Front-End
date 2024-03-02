import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import artworks from "../data/Listartworks"
import "../styles/Artwork.css";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector, useDispatch } from "react-redux";
import {
    addComment,
    deleteComment,
    updateComment,
} from "../features/FeaturesComment";

const Artwork = () => {
    const { id } = useParams();
    const thisArtwork = artworks.find((artwork) => String(artwork.id) === id);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const ITEM_HEIGHT = 48;
    const open = Boolean(anchorEl);
    const comments = useSelector((state) => state.comments.value);
    const dispatch = useDispatch();
    const [myComments, setMyComments] = useState("");
    const [selectedComment, setSelectedComment] = useState({});
    const [updateFlag, setUpdateFlag] = useState(false);

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
    return (
        <>
            <main className="pin-container">
                {thisArtwork && (
                    <div key={thisArtwork.id} className="artwork-item">
                        <img src={thisArtwork.src} alt={`Artwork ${thisArtwork.id}`} />
                    </div>
                )}
                <div className="pin-title">
                    <div className="pin-button">
                        <LoyaltyIcon sx={{ fontSize: 30, m: 2, cursor: "pointer" }} />
                        <MoreHorizIcon sx={{ fontSize: 30, m: 2, cursor: "pointer" }} />
                        <div className="price">{thisArtwork.price}</div>
                        <button className="save-button">Save</button>
                    </div>
                    <div className="comment-container">
                        <div className="title">{thisArtwork.title}</div>
                        <div className="topic" readonly>
                            <TextField
                                readOnly
                                label={thisArtwork.topic}
                                InputProps={{ readOnly: true }}
                            />
                        </div>
                        <div>
                            <div className="user">
                                <Avatar sx={{ fontSize: 30, m: 2, cursor: "pointer" }} />
                                <div className="user-follower">
                                    <p className="artist">{thisArtwork.artist}</p>
                                </div>
                            </div>
                            <div className="content">
                                <p className="text-description">Description</p>
                                <p className="description">{thisArtwork.description}</p>
                            </div>
                            <p className="text-comment">Comment</p>

                            {comments.map((comment) => (
                                <div className="comments" key={comment.id} id={comment.id}>
                                    <Avatar sx={{ fontSize: 30, m: 2, cursor: "pointer" }} />
                                    <div className="reply-comment">
                                        <p className="user-comment">{comment.userName}</p>
                                        <p className="timestamp">{comment.time}</p>
                                    </div>

                                    <p className="comment-text">{comment.comment}</p>

                                    {/* <p>
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={(event) => {
                        handleClick(event);
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        "aria-labelledby": "long-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "20ch",
                        },
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          setSelectedComment(comment);
                          setMyComments(comment.comment);
                          handleClose();
                        }}
                      >
                        Update Comment
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          console.log("delete comment", comment.id);
                          handleDeleteComment(comment.id);
                        }}
                      >
                        Delete Comment
                      </MenuItem>
                    </Menu>
                  </p> */}
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
                                            onClick={() => {
                                                console.log("delete comment", comment.id);
                                                dispatch(deleteComment({ id: comment.id }));
                                            }}
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
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="ur-comment">
                        <div className="react">
                            <p className="think">What do you think?</p>
                            <button
                                className="like"
                                sx={{ ":active": { color: "red[500]" } }}
                            ></button>
                        </div>
                        <div className="add-comment">
                            <Avatar sx={{ fontSize: 40, m: 2, cursor: "pointer" }} />
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
                                        dispatch(
                                            updateComment({
                                                id: selectedComment.id,
                                                comment: myComments,
                                            })
                                        );
                                        setMyComments("");
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
                                    onSubmit={() => {
                                        dispatch(
                                            addComment({
                                                id: comments.length + 1,
                                                userName: "Me",
                                                time: new Date().toLocaleTimeString(),
                                                comment: myComments,
                                            })
                                        );
                                        setMyComments("");
                                    }}
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
            </main>
            <div className="other-artworks">
                <p className="text-other-artworks">More to explore artworks</p>
            </div>
        </>
    );
};

export default Artwork;
