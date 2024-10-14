// src/pages/Blog.jsx
import React from 'react';
import { mockGetBlogs } from '../utils/graphqlQueries';  // Import the mockGetBlogs function

const Blog = () => {
  const blogs = mockGetBlogs();  // Use the mock data here

  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <a href={`/blog/${blog.id}`}>{blog.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;