const express = require('express');
const {
  addComment,
  editComment,
  deleteComment,
  getCommentsForPost,
} = require('../controllers/commentController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/posts/:postId/comments', auth, addComment);
router.get('/posts/:postId/comments', getCommentsForPost);
router.put('/comments/:id', auth, editComment);
router.delete('/comments/:id', auth, deleteComment);

module.exports = router;
