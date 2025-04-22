import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import './profile.scss'
import { LocationOn, CalendarToday, Link } from '@mui/icons-material';
import { AuthContext } from '../../context/authContext';
import Edit_Profile from '../../components/update/Edit_Profile';
import Post from '../../components/post/Post';


function Profile() {
  const {currentUser} = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCoverImage, setSelectedCoverImage] = useState(null);
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('post');
  const [counts, setCounts] = useState({ followers: 0, following: 0 });


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('No access token found. User is not authenticated.');
          return;
        }

        // fetch profile data
         const profileResponse = await axios.get(`http://localhost:8800/api/users/profile/${currentUser.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setProfileData(profileResponse.data);


        // Fetch posts for the user
        const postResponse = await axios.get(`http://localhost:8800/api/posts/profile/${currentUser.username}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setPosts(postResponse.data);


        // Fetch follower and following counts
        const countResponse = await axios.get(`http://localhost:8800/api/follow/follow-counts/${currentUser.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setCounts({
          followers: countResponse.data.followers,
          following: countResponse.data.following
        });


      } catch (error) {
        console.log('Error fetching profile data : ', error);
      }
    };

    if(currentUser){
      fetchProfileData();
    }
    
  }, [currentUser]);

  

  if(!profileData){
    return <div>Loading...</div>;
  }



  const handleCoverImageChange = (e) => {
    setSelectedCoverImage(e.target.files[0]);
  };

  const handleCoverUpload = async () => {
    if (!selectedCoverImage) return;
  
    const formData = new FormData();
    formData.append("coverPic", selectedCoverImage);
  
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`http://localhost:8800/api/users/cover/${currentUser.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      // Refresh the profile data
      const updatedProfile = await axios.get(`http://localhost:8800/api/users/profile/${currentUser.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
  
      setProfileData(updatedProfile.data);
      // setIsEditOpen(false);
      setIsCoverModalOpen(false);
      setSelectedCoverImage(null);
    } catch (error) {
      console.error("Failed to upload cover image:", error);
    }
    finally{
      setIsUploading(false);
    }
  };



  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={
            profileData.coverPic
              ? `${profileData.coverPic}?t=${new Date().getTime()}`
              : 'https://cdn-useast1.kapwing.com/static/templates/facebook-cover-photo-or-video-template-regular-85c93719.webp'
          }
          alt=""
          className="cover-image"
        />

        <button className="edit-cover-btn" onClick={() => setIsCoverModalOpen(true)}>
          ✏️
        </button>

        {isCoverModalOpen && (
          <div className="modal-overlay" onClick={() => setIsCoverModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-btn" onClick={() => setIsCoverModalOpen(false)}>
                &times;
              </span>
              <h2>Update Cover Image</h2>
              <input type="file" onChange={handleCoverImageChange} />
              <button className="save-btn" onClick={handleCoverUpload} disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Update Cover Image'}
              </button>
            </div>
          </div>
        )}

        <div className="profile-image-container">
          <img
            className="profile-image"
            src={
              profileData.profilePic
                ? `${profileData.profilePic}?t=${new Date().getTime()}`
                : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
            }
            alt=""
          />
        </div>

      </div>

      <div className="profile-info">
        <div className="profile-name">
          <h1>{profileData.name || 'Profile Name'}</h1>
          <p>@{profileData.username || 'username'}</p>
        </div>

        <p className="bio">{profileData.Bio || 'Your Bio Put Here'}</p>

        <div className="bio-info">
          <p>
            <LocationOn fontSize="small" />
            {profileData.city}
          </p>
          <p className="join-info">
            <CalendarToday fontSize="small" /> Joined Since {profileData.joinYear}
          </p>
        </div>

        <div className="followers-info">
          <p>
            <span className="bold-text">{counts.following}</span> Following
          </p>
          <p>
            <span className="bold-text">{counts.followers}</span> Followers
          </p>
        </div>

        <p className="website-info">
          <Link fontSize="small" />
          {profileData.website}
        </p>

        <button className="edit-profile-btn" onClick={() => setIsEditOpen(true)}>
          Edit Profile
        </button>

        

        {isEditOpen && (
          <div className="modal-overlay" onClick={() => setIsEditOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-btn" onClick={() => setIsEditOpen(false)}>
                &times;
              </span>
              <Edit_Profile />
            </div>
          </div>
        )}
      </div>

      <div className="activity-section">
        <div className="activity">
          <div className="activity-post" onClick={() => setActiveTab('post')}>
            <h3>POST</h3>
          </div>
          <div className="activity-about">
            <h3>ABOUT</h3>
          </div>
          <div className="activity-friends">
            <h3>FRIENDS</h3>
          </div>
          <div className="activity-more">
            <h3>
              MORE <span className="dropdown-arrow">▼</span>
            </h3>
            <div className="dropdown-content">
              <a href="#">Additional Option 1</a>
              <a href="#">Additional Option 2</a>
              <a href="#">Additional Option 3</a>
            </div>
          </div>
        </div>
      </div>


       {/* Tab Content */}
      <div className="tab-content">
          {activeTab === 'post' && <Post posts={posts}/>}
      </div>

    </div>
  );
}

export default Profile;