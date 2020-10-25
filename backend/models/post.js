const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  caption: { 
    type: String, 
    required: true 
  },
  imagePath: { 
    type: String, 
    required: true 
  },
  creator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  visibility: {
    type: Boolean
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User"
  }],
  comments: [{
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    text: {
      type: String, 
      required: true 
    }
  }]
});

module.exports = mongoose.model("Post", postSchema);
