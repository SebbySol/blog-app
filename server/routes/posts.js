const router = require("express").Router();
const Post = require("../models/Post");
const auth = require("../middleware/auth");

// GET all posts (public)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single post (public)
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username",
    );
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE post (auth requiired)
router.post("/", auth, async (req, res) => {
  try {
    const post = new Post({ ...req.body, author: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE post (auth required + owner only)
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ error: 'Post not found' })
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ error: 'Unauthorized' })
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE post (owner or admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ error: 'Post not found' })
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ error: 'Unauthorized' })
    await Post.findByIdAndDelete(req.params.id)
    res.json({ message: 'Post deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router;
