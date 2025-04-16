import React, { useContext, useEffect, useState } from 'react'
import "./Edit_Profile.scss"
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Edit_Profile() {
    const {currentUser} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        username: "",
        name: "",
        profilePic: "",
        coverPic: "",
        Bio: "",
        city: "",
        website: "",
        joinYear: ""
    });
    const [profileImage, setProfileImage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if(!currentUser) return;
        axios.get(`/api/users/profile/${currentUser.id}`,
        {
            withCredentials : true,
            headers : {
                Authorization : `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then((res) => {
            setUser(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        });
    },[currentUser?.id]);
    console.log("Current User ID:", currentUser?.id);


    const handleChange = (e) => {
        setUser({...user, [e.target.name] : e.target.value});
    };
    const handleFileChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) return alert("User not authenticated");

        const formData = new FormData();
        formData.append("username", user.username);
        formData.append("name", user.name);
        formData.append("Bio", user.Bio);
        formData.append("city", user.city);
        formData.append("website", user.website);
        if (profileImage) {
            formData.append("img", profileImage); // Append image
        }

        try {
            await axios.put(`/api/users/update/${currentUser.id}`, formData, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            alert("Profile has been updated");
            navigate("/profile");
        } catch (error) {
            console.log(error);
            alert("Failed to update profile. Please try again.");
        }
    };

  return (
    <div className="Edit-Profile-container">
        <div className="Edit-container">

        <div className="profile-card">
            <h2>{user.name}</h2>
            <p className="username">@{user.username}</p>
            <img src={user.profilePic} alt="" className='profile-pic' />
            <input type="file" name="img" accept="image/*" onChange={handleFileChange} />
            {/* <button className="upload-btn">Upload New Photo</button> */}
            <p className="member-since">Member Since : {user.joinYear || "0000"}</p>
        </div>
        

        <div className="edit-profile">
    
                <h2 className='edit-profile-title'>Edit Profile</h2>
          
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="input-group">
                            <label>Full Name</label>
                            <input type="text" name="name" value={user.name} onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label>Username</label>
                            <input type="text" name="username" value={user.username} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label>City</label>
                            <input type="text" name="city" value={user.city} onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label>Website</label>
                            <input type="text" name="website" value={user.website} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="Bio-row">
                        <label>Bio</label>
                        <textarea name="Bio" value={user.Bio} onChange={handleChange} placeholder="Write something about yourself"></textarea>
                    </div>

                    <button type="submit" className="update-btn">Update Info</button>
                </form>
        </div>
    </div>
</div>
  )
}

