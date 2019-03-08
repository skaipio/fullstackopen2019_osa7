const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  comments: {
    type: [{ type: String, minlength: 3, required: true }],
    default: []
  }
});

blogSchema.set("toJSON", {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
