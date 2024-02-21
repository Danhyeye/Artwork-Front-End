import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import artworks from '../data/Listartworks.json';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import '../styles/Upload.css';

class DisplayImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        };
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                image: URL.createObjectURL(img)
            });
        }
    };

    render() {
        return (
            <>
                <div className="upload-container">
                    <div className="upload-image">
                        <img src={this.state.image} />
                        <p>Choose a file or drag and drop it here</p>
                        {!this.state.image && (
                            <button><input type="file" onChange={this.onImageChange} />    </button>

                        )}
                        <style>
                            {`input[type='file'] {
                            color: transparent;
                        }`}
                        </style>

                    </div>
                    <div className="description-artwork" >
                        <p>Tittle</p>
                        <TextField label="Add a title" variant="outlined" sx={{ width: 700 }} />
                        <p>Description</p>
                        <TextField label="Add a detailed desciption" variant="outlined" sx={{ width: 700 }} />
                        <p>Price</p>
                        <FormControl fullWidth sx={{ width: 700 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="Amount"
                            />
                        </FormControl>
                        <p>Link</p>
                        <TextField label="Add a link" variant="outlined" sx={{ width: 700 }} />
                        <p>Topic</p>
                        <Autocomplete
                            sx={{ width: 700 }}
                            multiple
                            id="tags-outlined"
                            options={artworks}
                            getOptionLabel={(option) => option.topic}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Add a topic"
                                />
                            )}
                        />
                        <button className="upload-button">Upload</button>

                    </div>


                </div>
            </>

        );
    }
}
export default DisplayImage;