import React, { useState } from "react";
import { ThumbUpOutlined as LikeIcon } from "@mui/icons-material";
import { CommentOutlined as CommentIcon } from "@mui/icons-material";
import { ShareOutlined as ShareIcon } from "@mui/icons-material";
import './posts.scss';
import { makeRequest } from "../../axios";

const Posts = ({ post }) => {
  const [isCommenting, setIsCommenting] = useState(false);  
  const [likes, setLikes] = useState(post?.likes || 0);
  const [isLiked, setIsLiked] = useState(post?.isLiked || false);
  const [newComment, setNewComment] = useState(""); 

  const handleLike = async () => {
    try {
      const res= await makeRequest.put(`/api/likes/${post.id}/like`, {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken")
        },
      });
      if (res.data === "Post liked") {
        setLikes((prev) => prev + 1);
        setIsLiked(true);
      } else if (res.data === "Post unliked") {
        setLikes((prev) => Math.max(prev - 1, 0));
        setIsLiked(false);
      }
    }
    catch (error) {
      console.error("Error liking post", error);
    }
  }

  const handleCommentToggle = () => {
    setIsCommenting(!isCommenting);  
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);  
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        userName: "You",
        text: newComment
      };
      post.comments.push(newCommentObj);  
      setNewComment("");  
    }
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
      {isCommenting && (
        <div className="commentsSection">
          <div className="addComment">
            <textarea 
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Write a comment..."
            />
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
          <h4>Comments</h4>
          {post?.comments?.map((comment, index) => (
            <div className="comment" key={index}>
              <span className="commentUserName">{comment.userName}:</span>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;

































































































































/*import { makeRequest } from '../../axios.jsx';
import Post from '../post/Post';
import './posts.scss';
import { useQuery } from '@tanstack/react-query';

const Posts = () => {
  // Use react-query to fetch posts data without authentication
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      console.log("Sending request to fetch posts");

      try {
        const response = await makeRequest.get("/api/posts");  // No token required

        // Log the response data
        console.log("Response data:", response.data);
        return response.data;

      } catch (err) {
        console.error("Error during request:", err);  // Log any errors during the request
        throw err;  // Re-throw to handle in the `onError` of the query
      }
    },
    onSuccess: (data) => {
      console.log('Data received successfully:', data); // Log success response data
    },
    onError: (error) => {
      console.error('Error fetching posts:', error); // Log error from query
    },
  });

  // Log states for loading, error, and data
  console.log('isLoading:', isLoading);  // Log the loading state
  console.log('error:', error);  // Log the error state
  console.log('data:', data);  // Log the fetched data

  return (
    <div className="posts">
      {error ? (
        <div>Something went wrong! {console.log("Rendering error message.")}</div>
      ) : isLoading ? (
        <div>Loading... {console.log("Rendering loading message.")}</div>
      ) : (
        data?.map((post) => (
          <Post post={post} key={post.id} />
        ))
      )}
    </div>
  );
};

export default Posts;*/







// import { makeRequest } from '../../axios'
// import Post from '../post/Post'
// import "./posts.scss"
// import {useQuery} from '@tanstack/react-query'
// import { useContext } from 'react'
// import { AuthContext } from '../../context/authContext'




// const Posts = () => {
//     // const { isLoading, error, data } = useQuery(['repoData'], () => {
//     //   return makeRequest.get("/posts").then(res => res.data)
//     // })


      
// const {currentUser} = useContext(AuthContext); 
// console.log(currentUser);

//       const { isLoading, error, data } = useQuery({
//         queryKey: ['repoData'],
//         // queryFn: () => makeRequest.get("/posts").then(res => res.data),
//         queryFn: () => makeRequest.get("/api/posts").then(res => res.data),
//         onSuccess: (data) => {
//           console.log('Data received:', data);
//       },
//       onError: (error) => {
//           console.error('Error fetching posts:', error);
//       }
//     });
//     console.log('isLoading:', isLoading);
//     console.log('error:', error);
//     console.log('data:', data);
    
  
//     return (
//         <>
//       <div className="posts">
//         {error
//           ? "Something went wrong!"
//           : isLoading
//           ? "Loading..."
//           : data?.map((post) => (
//               <Post post={post} key={post.id} />
//             ))}
//       </div>

//       {/* //conditional logic 
//         <div className="posts">
//         {(() => {
//             if (error) {
//             return "Something went wrong!";
//             } else if (isLoading) {
//             return "Loading...";
//             } else if (data) {
//             return data.map((post) => (
//                 <Post post={post} key={post.id} />
//             ));
//             }
//             return null; // Fallback if none of the conditions are met
//         })()}
//         </div> */}

//         </>
//     )
//   }

// export default Posts





