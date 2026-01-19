const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {     
  const blog = await Blog.create({        
    title: req.body.title,         
    content: req.body.content,       
    author: req.user,     
  }); 
  res.json(blog);  
};

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find().populate("author", "name");
  res.json(blogs);
}; 

exports.updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(blog);
};

exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};  