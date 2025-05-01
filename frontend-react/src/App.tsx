// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RequirementsPage from "./pages/RequirementsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home/Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Static Requirements Page */}
        <Route path="/requirements" element={<RequirementsPage />} />

        {/* Project Details Page */}
        <Route path="/project/:projectId" element={<ProjectDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
