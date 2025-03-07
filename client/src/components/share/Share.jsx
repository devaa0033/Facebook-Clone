import React, { useState } from 'react'

export default function Share() {
    const [file, setFile] = useState(null)
    const [desc, setDesc] = useState("")
  return (
    <div className="share">
        <div className="container">
            <div className="top">
                <div className="left">
                    <img src={"/upload/"+currentUser.profilePic} alt="" />
                    <input type="text" placeholder={'What is in your mind ${currentUser.name}?'} onChange={(e) => setDesc(e.target.value)} value={desc} />
                </div>

                <div className="right">
                    { file && (
                        <img className='file' src={URL.createObjectURL(file)} alt="" />
                    )}
                </div>
            </div>

            <hr />

            <div className="bottom">
                <div className="left">
                    <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />

                    <label htmlFor="file">
                        <div className="item">
                            <img src={Image} alt="" />
                            <span>Add Image</span>
                        </div>
                    </label>

                    <div className="item">
                        <img src={Map} alt="" />
                        <span>Add Place</span>
                    </div>

                    <div className="item">
                        <img src={Friend} alt="" />
                        <span>Tag Friends</span>
                    </div>
                </div>


                <div className="right">
                    <button onClick={handleClick}>Share</button>
                </div>
            </div>

        </div>
    </div>
  )
}
