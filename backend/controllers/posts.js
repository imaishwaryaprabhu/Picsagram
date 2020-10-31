const Post = require("../models/post");
const ObjectId = require('mongoose').Types.ObjectId;

exports.createPost = async (req, res, next) => {
  try {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      caption: req.body.caption,
      imagePath: url + "/images/posts/" + req.file.filename,
      creator: req.user.id,
      createdDateTime: parseInt(new Date().getTime())
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
        .findOneAndUpdate(
          { _id: req.params.id, creator: req.user.id }, 
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
  // const postQuery = Post.find({ $or: [{ creator: req.user.id }, { public: true }] });
  let query = [
    {
      $match: {
        $or: [
          { creator: new ObjectId(req.user.id) }, 
          { public: true }
        ]
      }
    }, {
      $lookup: {
        from: "users",
        localField: "creator",
        foreignField: "_id",
        as: "createdBy"
      }
    }, {
      $unwind: "$createdBy"
    }, {
      $project: {
        _id: 1,
        caption: 1,
        imagePath: 1,
        likes: { $size: "$likes" },
        likedByUser: {
          $cond: { if: { $in: [ new ObjectId(req.user.id) , "$likes"] }, then: true, else: false }
        },
        comments: { $size: "$comments" },
        allowEdit: {
          $cond: { if: { $eq: [ "$creator", new ObjectId(req.user.id) ] }, then: true, else: false }
        },
        "createdBy.username": 1,
        "createdBy.profileImage": 1,
        public: 1,
        createdDateTime: 1
      }
    }, {
      $sort: {
        _id: -1
      }
    }
  ];
  const countQuery = [
    {
      $match: {
        $or: [
          { creator: new ObjectId(req.user.id) }, 
          { public: true }
        ]
      }
    },
    {
      $count: "totalCount"
    }
  ];

  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.pageno;
  if (pageSize && currentPage) {
    query.push({
      $skip: pageSize * (currentPage - 1)
    });
    query.push({
      $limit: pageSize
    });
  }

  try {
    const posts = await Post.aggregate(query);
    const count = await Post.aggregate(countQuery);

    res.status(200).send({
        message: "Success",
        posts: posts,
        totalCount: count[0].totalCount
    });
  } catch (error) {
      res.status(500).send({ message: "Failed to fetch posts." });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, creator: req.user.id });
    if (!post) return res.status(404).send({ message: "Post with the given ID not found." });

    res.send({
        message: "Post deleted successfully.",
        post: post
    });
  } catch (error) {
    res.status(500).send({ message: "Failed to delete the post." });
  }
};

exports.changePostPrivacy = async (req, res, next) => {
  try {
    let post = await Post.findOne({ _id: req.params.id, creator: req.user.id });
    if (!post) return res.status(404).send({ message: "Post with the given ID not found." });

    if (post.public !== req.body.public)
      post = await Post.findByIdAndUpdate(req.params.id, { public: !post.public }, { new: true });

    res.send({
        message: "Post privacy changed.",
        post: post
    });
  } catch (error) {
    res.status(500).send({ message: "Failed to change the post privacy." });
  }
}

exports.likePost = async (req, res, next) => {
  let updateQuery = { $pull: { likes: new ObjectId(req.user.id) } };
  if (req.body.like) {
    updateQuery = { $push: { likes: new ObjectId(req.user.id) } };
  }
  console.log(updateQuery);

  try {
    const post = await Post
        .findByIdAndUpdate(
          req.params.id, 
          updateQuery,
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
}
