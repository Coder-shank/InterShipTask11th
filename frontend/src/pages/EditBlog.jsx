import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

export default function EditBlog() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      const token = localStorage.getItem("token");
      const res = await API.get(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTitle(res.data.title);
      setContent(res.data.content);
    };
    fetchBlog();
  }, [id]);

  const update = async () => {
    const token = localStorage.getItem("token");
    await API.put(`/blogs/${id}`, { title, content }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Edit Blog</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <br /><br />
      <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      <br /><br />
      <button onClick={update}>Update</button>
    </div>
  );
}
