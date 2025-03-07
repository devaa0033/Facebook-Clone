import React, { useEffect, useState } from 'react'
import Post from './Posts.jsx'
import { makeRequest } from '../../axios.jsx'

export const PostsAxios = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await makeRequest.get("/api/posts/");
                setPosts(res.data);
                setLoading(false); //Stop loading
            } catch (err) {
                setError(err);
                setLoading(false); //Stop loading if there was an error
            }
        };
        fetchPosts();
    }, []);


    if(loading) return <div>Loading...!</div>;
    if(error) return <div>{error.message}</div>;


  return (
    <div className="home">
        {posts.map((post) => (
            <Post post={post} key={post.id} />
        ))}
    </div>
  )
}

