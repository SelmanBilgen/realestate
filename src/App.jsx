import { BrowserRouter, Routes, Route } from "react-router-dom";
import Projects from "@/Pages/Projects";
import ProjectDetail from "@/Pages/ProjectDetail";
import Admin from "@/Pages/Admin";
import Layout from "@/Layout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Projects />} />
          <Route path="project/:id" element={<ProjectDetail />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;