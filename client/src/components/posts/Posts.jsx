import React, { useState } from "react";
import { ThumbUpOutlined as LikeIcon } from "@mui/icons-material";
import { CommentOutlined as CommentIcon } from "@mui/icons-material";
import { ShareOutlined as ShareIcon } from "@mui/icons-material";
import './posts.scss';
import { makeRequest } from "../../axios";
import axios from "axios";
import Comments from "../comments/Comments";

const Posts = ({ post }) => {
  const [isCommenting, setIsCommenting] = useState(false);  
  const [likes, setLikes] = useState(post?.likes || 0);
  const [isLiked, setIsLiked] = useState(post?.isLiked || false);
  const [newComment, setNewComment] = useState(""); 

  const handleLike = async () => {
    try {
      console.log("Sending like/unlike request for post ID:", post.id);
      
      const res = await axios.post(`http://localhost:8800/api/likes/${post.id}/like`, {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken")
        },
        timeout: 10000
      });
  
      console.log("Server response:", res.data);
  
      if (res.data.message === "Post liked") {
        setLikes(res.data.likeCount);
        setIsLiked(true);
        console.log("Post liked. Likes count updated:", res.data.likeCount);
      } else if (res.data.message === "Post unliked") {
        setLikes(res.data.likeCount);
        setIsLiked(false);
        console.log("Post unliked. Likes count updated:", res.data.likeCount);
      } else {
        console.log("Unexpected response:", res.data);
      }
    } catch (error) {
      console.error("Error liking/unliking post", error);
      if (error.response) {
        console.log("Error response:", error.response.data);
      }
    }
  };
  
  

  const handleCommentToggle = () => {
    setIsCommenting(!isCommenting);  
  };


  // Render post if it exists, otherwise return null or loading state
  if (!post) return <div>Loading...</div>;

  return (
    <div className="post">
      <div className="postHeader">
        <div className="userInfo">
          <img
            className="userProfilePic"
            src={post?.profilePic || ''}
            alt="User profile"
          />
          <div className="userNameContainer">
            <span className="userName">{post?.name}</span>
            <span className="postTime">{post?.createdAt}</span>
          </div>
        </div>
      </div>

      <div className="postContent">
        {post?.img && (
          <img 
            src={post.img} 
            alt="Post image" 
            className="postImage" 
          />
        )}
        <p>{post?.desc}</p> 
      </div>

      <div className="postActionsBottom">
        <div className="postActions">
          <div className={`likeButton ${isLiked ? "liked" : ""}`} onClick={handleLike}>
            <LikeIcon className="icon" />
            <span>{likes} Likes</span>
          </div>
          <div className="commentButton" onClick={handleCommentToggle}>
            <CommentIcon className="icon" />
            <span>Comment</span>
          </div>
          <div className="shareButton">
            <ShareIcon className="icon" />
            <span>Share</span>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {isCommenting && <Comments postId={post.id} />}
    </div>
  );
};

export default Posts;






