import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext'; // Adjust path to where your context is located

export default function Share() {
    const { currentUser } = useContext(AuthContext);  // Get the currentUser from the context
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");

    const handleClick = () => {
        // Handle post sharing functionality (e.g., make an API request)
    };

    // Early return if currentUser is not available yet (e.g., user is not logged in)
    if (!currentUser) {
        return <p>Loading...</p>; // Or a redirect to login page or something else
    }

    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <div className="left">
                        <img src={`/upload/${currentUser.profilePic}`} alt="User Profile" />
                        <input
                            type="text"
                            placeholder={`What is on your mind, ${currentUser.name}?`} // Personalized placeholder with user's name
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                        />
                    </div>

                    <div className="right">
                        {file && (
                            <img className="file" src={URL.createObjectURL(file)} alt="Preview" />
                        )}
                    </div>
                </div>

                <hr />

                <div className="bottom">
                    <div className="left">
                        <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />

                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="Add Image" />
                                <span>Add Image</span>
                            </div>
                        </label>

                        <div className="item">
                            <img src={Map} alt="Add Place" />
                            <span>Add Place</span>
                        </div>

                        <div className="item">
                            <img src={Friend} alt="Tag Friends" />
                            <span>Tag Friends</span>
                        </div>
                    </div>

                    <div className="right">
                        <button onClick={handleClick}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
