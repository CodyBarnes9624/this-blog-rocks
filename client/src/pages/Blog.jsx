import React, { useEffect, useState } from 'react'; 
import BlogList from '../components/BlogList';
import BlogPost from '../components/BlogPost';
import BlogForm from '../components/BlogForm';
import { useParams } from 'react-router-dom';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  const [currentPost, setCurrentPost] = useState(null);

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

  // Function to handle adding a new blog post
  const addNewPost = async (post) => {
    try {
      const response = await fetch('/api/blog/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      const newPost = await response.json();
      setPosts([...posts, newPost]); // Update the posts list with the new post
    } catch (error) {
      console.error('Error adding new post:', error);
    }
  };

  // Function to handle editing a blog post
  const editPost = async (updatedPost) => {
    try {
      const response = await fetch(`/api/blog/posts/${updatedPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });
      const editedPost = await response.json();
      setPosts(posts.map(post => (post.id === editedPost.id ? editedPost : post))); // Update the post in the state
      setCurrentPost(null); // Clear current post after editing
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  // Function to handle deleting a blog post
  const deletePost = async (postId) => {
    try {
      await fetch(`/api/blog/posts/${postId}`, {
        method: 'DELETE',
      });
      setPosts(posts.filter(post => post.id !== postId)); // Remove the deleted post from the state
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (id) {
    const post = posts.find(post => post.id === parseInt(id));
    return post ? <BlogPost post={post} onEdit={editPost} onDelete={deletePost} /> : <h2>Loading...</h2>;
  }

  return (
    <>
      
      <h1>Blog Page</h1>
        <BlogForm onSubmit={addNewPost} onEdit={editPost} currentPost={currentPost} />
      <BlogList posts={posts} onEdit={setCurrentPost} onDelete={deletePost} />
    </>
  )
};

export default Blog;

