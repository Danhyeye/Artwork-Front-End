import React from "react";
import TextField from "@mui/material/TextField";


import "../styles/Editprofile.css";


const Editprofile = () => {

    return (
        <div className="edit-container">
            <div className="edit-avatar">
                {/* {image && < img src={URL.createObjectURL(image)} />}
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
                )} */}
            </div>
            <div className="description-artwork">
                <p>First Name</p>
                <TextField
                    label="First Name"
                    variant="outlined"
                    sx={{ width: 700 }}
                />
                <p>Last Name</p>
                <TextField
                    label="Last Name"
                    variant="outlined"
                    sx={{ width: 700 }}
                />
                <p>Email</p>
                <TextField
                    label="Email"
                    variant="outlined"
                    sx={{ width: 700 }}
                />
                <p>Username</p>
                <TextField
                    label="Username"
                    variant="outlined"
                    sx={{ width: 700 }}
                />


                <button className="edit-profile" >
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default Editprofile;
