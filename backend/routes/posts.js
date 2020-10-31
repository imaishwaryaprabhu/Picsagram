const express = require("express");

const PostController = require("../controllers/posts");

const auth = require("../middleware/auth");
const uploadFile = require("../middleware/file");

const router = express.Router();

router.post("", auth, uploadFile, PostController.createPost);

router.put("/:id", auth, PostController.updatePost);

router.get("", auth, PostController.getPosts);

router.delete("/:id", auth, PostController.deletePost);

router.put("/:id/changePrivacy", auth, PostController.changePostPrivacy);

router.put("/:id/like", auth, PostController.likePost);

module.exports = router;
