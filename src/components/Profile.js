import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Profile.css";

export default class Profile extends Component {
    render() {
        return (
            <>
                <div className='profile'>
                    <h1 className='user-name'>Tran Cong Danh</h1>
                    <img className='avatar' src="./assets/images/avatar.png" alt="Avatar" />

                    <Link to="/edit-profile"><button className='edit-profile'>Edit Profile</button></Link>
                    <div className='created-saved'>
                        <button className='created'>Created</button>
                        <button className='saved'>Saved</button>
                    </div>
                </div>
            </>
        );
    }
}
