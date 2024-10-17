import React from 'react';
import './BlogList.css';  

const BlogList = ({ posts }) => {
  return (
    <div className="blog-list">
      {posts.map(post => (
        <div className="blog-list-item" key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
