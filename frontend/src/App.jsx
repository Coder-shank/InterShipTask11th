import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateBlog from "./pages/CreateBlog";   
import EditBlog from "./pages/EditBlog"; 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} /> 
      </Routes> 

    </BrowserRouter>
  );
}

export default App;
