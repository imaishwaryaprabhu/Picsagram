const Post = require("../models/post");

exports.createPost = async (req, res, next) => {
  try {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      caption: req.body.caption,
      imagePath: url + "/images/posts/" + req.file.filename,
      creator: req.user.id
    });
    await post.save();

    res.send({ 
      message: "Modal added successfully.",
      post: post
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to create post." });
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post
        .findByIdAndUpdate(
            req.params.id, 
            { caption: req.body.caption },
            { new: true }
        );
    if (!post) return res.status(404).send({ message: "Post with the given ID not found." });

    res.send({
        message: "Modal updated successfully.",
        post: post
    });
} catch (error) {
    res.status(500).send({ message: "Failed to update post." });
}
};

exports.getPosts = async (req, res, next) => {
  const postQuery = Post.find({ creator: req.user.id });
  
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.pageno;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  try {
    const posts = await postQuery.sort({ _id: -1 });
    const count = await Post.countDocuments({ creator: req.user.id });

    res.status(200).send({
        message: "Success",
        posts: posts,
        totalCount: count
    });
  } catch (error) {
      res.status(500).send({ message: "Failed to fetch posts." });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete({ _id: req.params.id, creator: req.user.id });
    if (!post) return res.status(404).send({ message: "Post with the given ID not found." });

    res.send({
        message: "Post deleted successfully.",
        post: post
    });
  } catch (error) {
    res.status(500).send({ message: "Failed to delete the post." });
  }
};
