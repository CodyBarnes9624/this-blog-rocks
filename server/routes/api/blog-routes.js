const router = require('express').Router();
let blogPosts = []; // You can replace this with a database

// Route to get all blog posts
router.get('/posts', (req, res) => {
  res.json(blogPosts);
});

// Route to create a new blog post
router.post('/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  const newPost = {
    id: blogPosts.length + 1, // Simple ID generation (you may use a database)
    title,
    content,
  };
  blogPosts.push(newPost);
  res.json(newPost);
});

// Route to update a blog post
router.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const postIndex = blogPosts.findIndex(post => post.id === parseInt(id));

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const updatedPost = { ...blogPosts[postIndex], title, content };
  blogPosts[postIndex] = updatedPost;
  res.json(updatedPost);
});

// Route to delete a blog post
router.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  const postIndex = blogPosts.findIndex(post => post.id === parseInt(id));

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  blogPosts.splice(postIndex, 1); // Remove the post from the array
  res.json({ message: 'Post deleted successfully' });
});

module.exports = router;

