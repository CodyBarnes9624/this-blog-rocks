import React, { useEffect, useState } from 'react';
import BlogList from '../components/BlogList';
import BlogPost from '../components/BlogPost';
import { useParams } from 'react-router-dom';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Fetch posts from an API or a local file
    const fetchPosts = async () => {
      // Replace with your API endpoint
      const response = await fetch('/api/music/playlists');
      const data = await response.json();
      setPosts(data.playlists.items);
    };
    console.log('Fetching playlists!!!')
    fetchPosts();
  }, []);

  if (id) {
    const post = posts.find(post => post.id === parseInt(id));
    return post ? <BlogPost post={post} /> : <h2>Loading...</h2>;
  }

  return (
    <><h1>Blog page</h1>
    <BlogList posts={posts} />
    </>
  )
};

export default Blog;
