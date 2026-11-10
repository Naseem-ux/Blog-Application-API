const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addComment,
  getPostComments,
  getSingleComment,
  updateComment,
  deleteComment
} = require("../controllers/commentController");

// Public route
router.get("/post/:postId", getPostComments);
router.get("/:id", getSingleComment);

// Protected routes
router.post("/post/:postId", authMiddleware, addComment);
router.put("/:id", authMiddleware, updateComment);
router.delete("/:id", authMiddleware, deleteComment);

module.exports = router;