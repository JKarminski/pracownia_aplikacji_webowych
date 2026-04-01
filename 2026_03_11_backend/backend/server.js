const express = require('express');
const cors = require('cors');
const axios = require('axios');
let tiles = require('./tilesData');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

const apiComments = {};
let nextCommentId = 1000;


app.get('/api/local/tiles', (req, res) => {
  res.json(tiles);
});

app.post('/api/local/subtopics/:subId/comments', (req, res) => {
  const { subId } = req.params;
  const { author, content } = req.body;

  if (!author || !content) {
    return res.status(400).json({ error: "Author and content are required" });
  }

  let found = false;
  for (const group of tiles) {
    if (group.subtopics) {
      const sub = group.subtopics.find(s => s.id === subId);
      if (sub) {
        if (!sub.comments) sub.comments = [];
        sub.comments.push({ author, content });
        found = true;
        break;
      }
    }
  }

  if (found) {
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Subtopic not found" });
  }
});


const JSON_API = "https://jsonplaceholder.typicode.com";

app.get('/api/json/posts', async (req, res) => {
  try {
    const response = await axios.get(`${JSON_API}/posts`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.get('/api/json/posts/:id', async (req, res) => {
  try {
    const response = await axios.get(`${JSON_API}/posts/${req.params.id}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

app.get('/api/json/users/:id', async (req, res) => {
  try {
    const response = await axios.get(`${JSON_API}/users/${req.params.id}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

app.get('/api/json/posts/:id/comments', async (req, res) => {
  try {
    const response = await axios.get(`${JSON_API}/posts/${req.params.id}/comments`);
    const remoteComments = response.data;
    const localComments = apiComments[req.params.id] || [];

    res.json([...remoteComments, ...localComments]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

app.post('/api/json/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  const { name, email, body } = req.body;

  if (!name || !body) {
    return res.status(400).json({ error: "Name and body are required" });
  }

  const newComment = {
    id: nextCommentId++,
    postId: parseInt(postId),
    name,
    email: email || "user@local.app",
    body
  };

  if (!apiComments[postId]) {
    apiComments[postId] = [];
  }

  apiComments[postId].push(newComment);
  res.status(201).json(newComment);
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
