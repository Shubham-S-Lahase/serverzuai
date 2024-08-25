const express = require('express');
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const auth = require('../middleware/auth');
const upload = require('../config/upload');

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', auth, upload.single('image'), createPost);
router.put('/:id', auth, upload.single('image'), updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;
