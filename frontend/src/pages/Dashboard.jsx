import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blogs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(res.data);
      } catch {
        alert("Failed to load blogs");
      }
    };
    fetchBlogs();
  }, [navigate]);

  const deleteBlog = async (id) => {
    const token = localStorage.getItem("token");
    await API.delete(`/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBlogs(blogs.filter(b => b._id !== id));
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={() => {
        localStorage.removeItem("token");
        navigate("/");
      }}>Logout</button>

      <button onClick={() => navigate("/create-blog")}>Create Blog</button>

      <hr />

      <h3>All Blogs</h3>
      {blogs.length === 0 ? (
        <p>No blogs found</p>
      ) : blogs.map(blog => (
        <div key={blog._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h4>{blog.title}</h4>
          <p>{blog.content}</p>

          <button onClick={() => navigate(`/edit-blog/${blog._id}`)}>Edit</button>
          <button onClick={() => deleteBlog(blog._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
