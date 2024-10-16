import React, { useState, useEffect } from 'react';

const BlogForm = ({ onSubmit, onEdit, currentPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Effect to populate fields when editing
  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.title);
      setContent(currentPost.content);
    }
  }, [currentPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      if (currentPost) {
        // If editing, call onEdit
        onEdit({ ...currentPost, title, content });
      } else {
        // If creating a new post, call onSubmit
        onSubmit({ title, content });
      }
      // Clear the form fields
      setTitle('');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{currentPost ? 'Edit Blog Post' : 'Create a New Blog Post'}</h2>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">{currentPost ? 'Update Post' : 'Post Blog'}</button>
    </form>
  );
};

export default BlogForm;

