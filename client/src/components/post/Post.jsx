import React from 'react'
import { useNavigate } from 'react-router-dom'
import './post.scss';

export default function Post({posts}) {
  const navigate = useNavigate();

  const handleClick = (post) => {
    navigate(`/post/${post.name}`, { state: { post}});
  }
  return (
      <div className="Userpost">
        <div className="post-container">

            {posts.length === 0 ? (
              <p>No posts yet.</p>
            ) : (
              posts.map((post, idx) => (
              <img key={idx} src={post.img} alt="" onClick={() => handleClick(post)} />
              ))
            )}
        </div>
      </div>
  );
};


