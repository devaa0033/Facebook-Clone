import React from 'react'
import Posts from '../../components/posts/Posts'
import { PostsAxios } from '../../components/posts/PostsAxios'

function Home() {
  return (
    <div className="home">
        <PostsAxios />
    </div>
  )
}

export default Home