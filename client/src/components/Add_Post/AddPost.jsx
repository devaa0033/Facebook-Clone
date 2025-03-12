import { useContext, useState } from "react";
import "./AddPost.scss"
import CloseIcon from '@mui/icons-material/Close';
import { makeRequest } from "../../axios";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

export default function AddPost() {
    const {currentUser} = useContext(AuthContext);
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

   

    const handleDescChange = (e) => {
        setDesc(e.target.value);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handlePostSubmit = async(e) => {
        e.preventDefault();

        if(!currentUser){
            setError("You must be logged in to create a post");
        }

        const formData = new FormData();
        formData.append("desc", desc);
        if(file){
            formData.append("img", file);
        }
        formData.append("userId", currentUser.id);
        


        try {
            const accessToken = localStorage.getItem("accessToken");
            console.log(accessToken);

            const res = await axios.post("http://localhost:8800/api/posts/addPost", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(res.data);
            alert("Post has been created");
        }
        catch(err) {
            console.log('Error : ', err);
            alert("There was an error creating the post");
        }
    };

  return (
    <div className="addPost">
        <div className="form">
            <div className="sec1">
              <h2>Create Post</h2>
              <CloseIcon />
            </div>

            <div className="sec2">
                <div className="sec2_1">
                    <textarea name="" id="" cols="30" rows="10" placeholder='What is in your mind?' className='textarea' onChange={handleDescChange} value={desc}></textarea>
                </div>
                <div className="sec2_2">
                    <h3>Add Image :</h3>
                    <input type="file" className='file' onChange={handleFileChange} />
                </div>
            </div>

            <div className="sec3">
                <button onClick={handlePostSubmit}>Post</button>
            </div>
        </div>
    </div>
  )
}
/*"Music is the soundtrack of my soul. 🎶 #FeelTheBeat"
"Lost in the rhythm, found in the melody. 🎧🎤 #MusicLover"
"When words fail, music speaks. 🎶💫 #MusicVibes"
"The only thing better than a great song? Singing along to it! 🎵🎤 #MusicAddict"
"Let the music take you places. 🌍🎶 #JourneyThroughSound"
"Turn the volume up, let the music do the talking! 🔊🎶 #SoundtrackOfMyLife"
"Vibes, rhythms, and everything in between. 🎧🎶 #LiveForMusic"
"Catching feels with every beat. 🎶❤️ #MusicMood"
"Music isn't just a hobby; it's a way of life. 🎸🎧 #MusicIsLife"
"A song can change the way you feel. 💫🎶 #MusicHeals"*/