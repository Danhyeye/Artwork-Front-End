import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch } from "react-redux";
import artworks from "../data/Listartworks"

import "../styles/Upload.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db } from "../firebase/config";
import { v4 } from "uuid";
import { addArtwork } from "../features/artworks/ArtworksSlice";
import { ArtworksThunk } from "../features/artworks/ArtworksThunk";

const DisplayImage = () => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [topics, setTopics] = useState([]);
    const dispatch = useDispatch();


    const handleUpload = async () => {
        if (image !== null) {
            const imgRef = ref(db, `files/${v4()}`)
            await uploadBytes(imgRef, image).then(value => {
                getDownloadURL(value.ref).then(url => {
                    const newArtwork = {
                        id: Date.now(),
                        src: url,
                        title: title,
                        price: price,
                        topics: topics,
                        description: description,
                    };
                    dispatch(ArtworksThunk.createArtwork(newArtwork))
                        .then(() => {
                            dispatch(addArtwork(newArtwork));
                        });
                    clearForm();
                });
            })
        }
    }
    const clearForm = () => {
        setImage(null);
        setTitle("");
        setDescription("");
        setPrice(0);
        setTopics([]);
    }

    return (
        <div className="upload-container">
            <div className="upload-image">
                {image && < img src={URL.createObjectURL(image)} />}
                <p>Choose a file or drag and drop it here</p>
                {!image && (
                    <button>
                        <input
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={(event) => {
                                setImage(event.target.files[0]);
                            }}
                        />
                    </button>
                )}
            </div>
            <div className="description-artwork">
                <p>Title</p>
                <TextField
                    label="Add a title"
                    variant="outlined"
                    sx={{ width: 700 }}
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <p>Description</p>
                <TextField
                    label="Add a detailed description"
                    variant="outlined"
                    sx={{ width: 700 }}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
                <p>Price</p>
                <FormControl fullWidth sx={{ width: 700 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Amount"
                        onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                        value={price}
                    />
                </FormControl>
                <p>Topics</p>
                <Autocomplete
                    sx={{ width: 700 }}
                    multiple
                    id="tags-outlined"
                    options={artworks}
                    onChange={(event, newValue) => setTopics(newValue)}
                    value={topics}
                    getOptionLabel={(option) => option.topic}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField {...params} label="Add a topic" />
                    )}
                />
                <button className="upload-button" onClick={handleUpload}>
                    Upload
                </button>
            </div>
        </div>
    );
};

export default DisplayImage;
