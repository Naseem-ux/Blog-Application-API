
const {postSchema} = require("../schema/postSchema");
const mongoose = require("mongoose");

// CREATE POST
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required"
      });
    }

    const post = await postSchema.create({
      title,
      content,
      author: req.user.id
    });

    res.status(201).json({
      message: "Post created successfully",
      post
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL POSTS
const getPosts = async (req, res) => {
  try {
    const posts = await postSchema.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: posts.length,
      posts
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE POST
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await postSchema.findById(id)
      .populate("author", "username");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ post });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE OWN POST
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    if (
      (title !== undefined && !title.trim()) ||
      (content !== undefined && !content.trim())
    ) {
      return res.status(400).json({
        message: "Title and content cannot be empty"
      });
    }

    const post = await postSchema.findOne({
      _id: id,
      author: req.user.id
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found or you are not the owner"
      });
    }

    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;

    await post.save();

    res.status(200).json({
      message: "Post updated successfully",
      post
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE OWN POST
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await postSchema.findOneAndDelete({
      _id: id,
      author: req.user.id
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found or you are not the owner"
      });
    }

    res.status(200).json({
      message: "Post deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
};
