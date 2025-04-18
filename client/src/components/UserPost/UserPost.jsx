import React, { useState } from 'react'
import "./UserPost.scss"
import { ThumbUpOutlined as LikeIcon } from "@mui/icons-material";
import { CommentOutlined as CommentIcon } from "@mui/icons-material";
import { ShareOutlined as ShareIcon } from "@mui/icons-material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';

export default function UserPost() {
    const {state} = useLocation();
    const navigate = useNavigate();

    const post = state?.post;

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <div className="back-btn">
            <ArrowBackIcon className='icon' onClick={() => navigate(-1)} />
            <span>Back</span>
        </div>

        <div className="UserPosts">
               <div className="postHeader">
                        <div className="userInfo">
                        <img className="userProfilePic" src={post?.profilePic || ''} alt="User profile"/>

                            <div className="userNameContainer">
                                <span className='username'>{post?.name}</span>
                                <span className='postTime'>{post?.createdAt}</span>
                            </div>
                        </div>
                    </div>

                    <div className="postContent">
                       { post.img && (<img src= {post.img} alt="Post image" className='postImage' />)}
                        <p>{post?.desc}</p>
                    </div>

                    <div className="postActionsBottom">
                        <div className="postActions">
                            <div className="likeButton">
                                <LikeIcon className="icon" />
                                <span> Likes</span>
                            </div>
                            <div className="commentButton">
                                <CommentIcon className="icon" />
                                <span>Comment</span>
                            </div>
                            <div className="shareButton">
                                <ShareIcon className="icon" />
                                <span>Share</span>
                            </div>
                        </div>
                    </div>


                    {/* {isCommenting && (
                    <div className="commentInput">
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={handleCommentChange}
                        />
                        <button onClick={handleAddComment}>Comment</button>
                    </div>
                )}

                {post.comments.length > 0 && (
                    <div className="comments">
                        {post.comments.map((comment, idx) => (
                            <div className="comment" key={idx}>
                                <span className="commentUserName">{comment.userName}</span>
                                <span className="commentText">{comment.text}</span>
                            </div>
                        ))}
                    </div>
                )} */}  
        </div>
            
        </>    
    );
  };
  