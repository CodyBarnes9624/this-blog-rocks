import React from 'react';
import './BlogPost.css';  

const BlogPost = ({ post }) => {
  return (
    <div className="blog-post">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default BlogPost;
