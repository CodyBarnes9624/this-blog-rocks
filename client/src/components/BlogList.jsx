import React from 'react';
import { Link } from 'react-router-dom';

const BlogList = ({ posts }) => {
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.name}</h2>
          <Link to={`/blog/${post.id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
