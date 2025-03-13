import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import './profile.scss'
import { LocationOn, CalendarToday, Link } from '@mui/icons-material';
import { AuthContext } from '../../context/authContext';
import Edit_Profile from '../../components/update/Edit_Profile';


function Profile() {
  const {currentUser} = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('No access token found. User is not authenticated.');
          return;
        }


         const profileResponse = await axios.get(`http://localhost:8800/api/users/profile/${currentUser.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        setProfileData(profileResponse.data);
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


  return (
    <div className="profile-container">
          {/* Profile Header with Cover Image */}
          <div className="profile-header">
            <img src= {profileData.coverPic ||"https://cdn-useast1.kapwing.com/static/templates/facebook-cover-photo-or-video-template-regular-85c93719.webp"} alt="" className='cover-image' />
            <div className="profile-image-container">
              <img className='profile-image' src= {profileData.profilePic || "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt="" />
            </div>
          </div>

          {/* profile Info */}
          <div className="profile-info">
            <div className="profile-name">
              <h1>{profileData.name || "Profile Name"}</h1>
              <p>@{profileData.username || "username"}</p>
            </div>

            <p className='bio'>{profileData.Bio || "Your Bio Put Here"}</p>
            <div className="bio-info">
               <p><LocationOn fontSize="small" />{profileData.city}</p>
               <p className="join-info"><CalendarToday fontSize="small" /> Joined Since {profileData.joinYear}</p>
            </div>
            <div className="followers-info">
              <p><span className='bold-text'>256</span> Following</p>
              <p><span className='bold-text'>165</span> Followers</p>
            </div>

            <p className="website-info">
              <Link fontSize="small" />
              {profileData.website}
            </p>
 
            <button className="edit-profile-btn" onClick={() => setIsEditOpen(true)}> Edit Profile</button>
            
            {/* Edit Profile Modal */}
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
              <div className="activity-post">
                  <h3>POST</h3>
              </div>
              <div className="activity-about">
                  <h3>ABOUT</h3>
              </div>
              <div className="activity-friends">
                  <h3>FRIENDS</h3>
              </div>
              <div className="activity-more">
              <h3>MORE <span className="dropdown-arrow">▼</span></h3>
                  <div className="dropdown-content">
                    <a href="#">Additional Option 1</a>
                    <a href="#">Additional Option 2</a>
                    <a href="#">Additional Option 3</a>
                  </div>
              </div>
            </div>
          </div>

    </div>
  )
}

export default Profile