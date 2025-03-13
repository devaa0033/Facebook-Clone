import React, { useContext, useEffect, useState } from 'react'
import "./Edit_Profile.scss"
import { AuthContext } from '../../context/authContext';
import axios from 'axios';

export default function Edit_Profile() {
    const {currentUser} = useContext(AuthContext);
    const [user, setUser] = useState({
        username : "",
        name : "",
        profilePic : "",
        coverPic : "",
        Bio : "",
        city : "",
        website : "",
        joinDate : ""
    });

    useEffect(() => {
        if(!currentUser) return;
        axios.get(`http://localhost:8800/api/users/profile/${currentUser.id}`,
        {
            withCredentials : true
        })
        .then((res) => {
            setUser(res.data);
        })
        .catch((err) => {
            console.log(err);
        },[currentUser]);
    })
  return (
    <div className="Edit-Profile-container">
        <div className="Edit-container">

        <div className="profile-card">
            <h2>{currentUser.name}</h2>
            <p className="username">@{currentUser.username}</p>
            <img src={currentUser.profilePic} alt="" className='profile-pic' />
            <button className="upload-btn">Upload New Photo</button>
            <p className="member-since">Member Since : {currentUser.joinDate}</p>
        </div>
        

        <div className="edit-profile">
    
                <h2 className='edit-profile-title'>Edit Profile</h2>
          
                <form>
                    <div className="form-row">
                        <div className="input-group">
                            <label>Full Name</label>
                            <input type="text" defaultValue="James" />
                        </div>
                        <div className="input-group">
                            <label>Username</label>
                            <input type="text" defaultValue="Allan" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label>City</label>
                            <input type="text" value="Mumbai" />
                        </div>
                        <div className="input-group">
                            <label>Website</label>
                            <input type="text" placeholder="www.example.com" />
                        </div>
                    </div>

                    <div className="Bio-row">
                        <label>Bio</label>
                        <textarea name="" id="" placeholder='Write something about yourself'></textarea>
                    </div>

                    <button type="submit" className="update-btn">Update Info</button>
                </form>
        </div>
    </div>
</div>
  )
}

