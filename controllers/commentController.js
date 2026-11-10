const {commentSchema} = require("../schema/commentSchema");
const {postSchema} = require("../schema/postSchema");
const mongoose = require("mongoose");

// 1. ADD COMMENT
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Comment text is required"
      });
    }

    if (!mongoose.isValidObjectId(postId)) {
      return res.status(400).json({
        message: "Invalid post ID"
      });
    }

    // Check whether post exists
    const post = await postSchema.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    // Create comment
    const comment = await commentSchema.create({
      text,
      post: postId,
      author: req.user.id
    });

    res.status(201).json({
      message: "Comment added successfully",
      comment
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// 2. GET ALL COMMENTS OF A PARTICULAR POST
const getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!mongoose.isValidObjectId(postId)) {
      return res.status(400).json({
        message: "Invalid post ID"
      });
    }

    const post = await postSchema.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    const comments = await commentSchema.find({
      post: postId
    })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: comments.length,
      comments
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// 3. GET SINGLE COMMENT
const getSingleComment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid comment ID"
      });
    }

    const comment = await commentSchema.findById(id)
      .populate("author", "username")
      .populate("post", "title");

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }

    res.status(200).json({ comment });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// 4. UPDATE OWN COMMENT
const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid comment ID"
      });
    }

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Comment text is required"
      });
    }

    const comment = await commentSchema.findById(id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }

    // Check comment ownership
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You cannot update another user's comment"
      });
    }

    comment.text = text.trim();

    await comment.save();

    res.status(200).json({
      message: "Comment updated successfully",
      comment
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// 5. DELETE OWN COMMENT
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid comment ID"
      });
    }

    const comment = await commentSchema.findById(id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }

    // Check comment ownership
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You cannot delete another user's comment"
      });
    }

    await commentSchema.deleteOne();

    res.status(200).json({
      message: "Comment deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


module.exports = {
  addComment,
  getPostComments,
  getSingleComment,
  updateComment,
  deleteComment
};