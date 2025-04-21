import React, { useEffect, useState } from 'react'
import './Comments.scss'
import { Delete } from '@mui/icons-material';
import { makeRequest } from '../../axios';

function Comments({postId}) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        fetchComments();
    }, [postId]);


    const fetchComments = async () => {
        try {
          const res = await makeRequest.get(`/api/comments/${postId}/comments`, {
           headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
           },
           withCredentials: true
          });
          setComments(res.data.comments);  
        } catch (err) {
            console.log("Error fetching comments:", err)
        }
    }


    const handleAddComment = async () => {
        if(!newComment.trim()) return;

        try {
            const res = await makeRequest.post(`/api/comments/${postId}/comment`, {
                desc: newComment
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                },
                withCredentials: true
            });
            setComments((prev) => [res.data.comment, ...prev]);
            setNewComment("");
        } catch (error) {
            console.log("Error adding comment:", error);
        }
    }

    const handleDeleteComment = async (commentId) => {
        try {
          await makeRequest.delete(`/api/comments/${commentId}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken")
            },
            withCredentials: true
          });
          setComments(prev => prev.filter(comment => comment.id !== commentId));
        } catch (err) {
          console.log("Error deleting comment:", err);
        }
      };
  return (
    <div className="commentsSection">
        <div className="addComment">
            <textarea placeholder='Write a comment...' value={newComment} onChange={(e) => setNewComment(e.target.value)} />
            <button onClick={handleAddComment}>Add Comment</button>
        </div>

        <h4>Comments</h4>

       {comments.length === 0 ? (
        <p>No comments yet.</p>
       ) : (
        comments.map((comment) => (
            <div key={comment.id} className="comment">
            <div className="commentHeader">
              <img
                src={comment.profilePic || "https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"}
                className="profilePic"
              />
              <strong>{comment.username}</strong>
            </div>
            <p>{comment.desc}</p>
            <small>{new Date(comment.createdAt).toLocaleString()}</small>
            <Delete
             className="deleteIcon"
             onClick={() => handleDeleteComment(comment.id)}
           />
          </div>
       ))
    )}

    </div>
  )
}

export default Comments;