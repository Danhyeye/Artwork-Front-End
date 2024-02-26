// import React, { useState } from "react";
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputAdornment from '@mui/material/InputAdornment';
// import { useDispatch } from "react-redux";
// import { addArtwork } from "../features/UploadImage";
// import artworks from '../data/Listartworks';
// import '../styles/Upload.css';

// const DisplayImage = () => {
//     const [image, setImage] = useState(null);
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [price, setPrice] = useState('');
//     const [topics, setTopics] = useState([]);
//     const dispatch = useDispatch();

//     return (
//         <>
//             <div className="upload-container">
//                 <div className="upload-image">
//                     <img src={image} />
//                     <p>Choose a file or drag and drop it here</p>
//                     {!image && (
//                         <button>
//                             <input
//                                 type="file"
//                                 accept="image/png, image/gif, image/jpeg"
//                                 onChange={(event) => {
//                                     setImage(URL.createObjectURL(event.target.files[0]));
//                                 }}
//                             />
//                         </button>
//                     )}
//                     <style>
//                         {`input[type='file'] {
//                                 color: transparent;
//                             }`}
//                     </style>
//                 </div>
//                 <div className="description-artwork">
//                     <p>Tittle</p>
//                     <TextField label="Add a title" variant="outlined" sx={{ width: 700 }} onChange={(e) => setTitle(e.target.value)}
//                     />
//                     <p>Description</p>
//                     <TextField label="Add a detailed desciption" variant="outlined" sx={{ width: 700 }} onChange={(e) => setDescription(e.target.value)} />
//                     <p>Price</p>
//                     <FormControl fullWidth sx={{ width: 700 }} >
//                         <InputLabel htmlFor="outlined-adornment-amount" >Price</InputLabel>
//                         <OutlinedInput
//                             id="outlined-adornment-amount"
//                             startAdornment={<InputAdornment position="start">$</InputAdornment>}
//                             label="Amount" onChange={(e) => setPrice(e.target.value)}
//                         />
//                     </FormControl>
//                     <p>Topic</p>
//                     <Autocomplete
//                         sx={{ width: 700 }}
//                         multiple
//                         id="tags-outlined"
//                         options={artworks}
//                         onChange={(e) => setTopics(e.target.value)}
//                         getOptionLabel={(option) => option.topic}
//                         filterSelectedOptions
//                         renderInput={(params) => (
//                             <TextField
//                                 {...params}
//                                 label="Add a topic"
//                                 value={topics}

//                             />
//                         )}
//                     />
//                     <button className="upload-button" onClick={() => {
//                         const newArtwork = {
//                             id: Date.now(),
//                             src: image,
//                             title: title,
//                             price: price,
//                             topics: topics,
//                             description: description
//                         };
//                         dispatch(addArtwork(newArtwork));
//                     }}>
//                         Upload
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default DisplayImage;

import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch } from "react-redux";
import { addArtwork } from "../features/UploadImage";
import artworks from '../data/Listartworks';


import '../styles/Upload.css';

const DisplayImage = () => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [topics, setTopics] = useState([]);
    const dispatch = useDispatch();

    const uploadImageToServer = async (image) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const fakeImageUrl = `https://example.com/uploads/${Date.now()}.jpg`;
                resolve(fakeImageUrl);
            }, 2000);
        });
    };

    const handleUpload = async () => {
        const uploadedImageUrl = await uploadImageToServer(image);

        const newArtwork = {
            id: Date.now(),
            src: uploadedImageUrl,
            title: title,
            price: price,
            topics: topics,
            description: description
        };

        dispatch(addArtwork(newArtwork));
        setImage(null);
        setTitle('');
        setDescription('');
        setPrice('');
        setTopics([]);
    };

    return (
        <div className="upload-container">
            <div className="upload-image">
                <img src={image} />
                <p>Choose a file or drag and drop it here</p>
                {!image && (
                    <button>
                        <input
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={(event) => {
                                setImage(URL.createObjectURL(event.target.files[0]));
                            }}
                        />
                    </button>
                )}
                <style>
                    {`input[type='file'] {
                        color: transparent;
                    }`}
                </style>
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
                        onChange={(e) => setPrice(e.target.value)}
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
                        <TextField
                            {...params}
                            label="Add a topic"
                        />
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

