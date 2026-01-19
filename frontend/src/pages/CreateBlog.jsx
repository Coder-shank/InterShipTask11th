import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    const token = localStorage.getItem("token");
    await API.post("/blogs", { title, content }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Create Blog</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <br /><br />
      <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      <br /><br />
      <button onClick={submit}>Publish</button>
    </div>
  );
}
