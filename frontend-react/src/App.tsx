// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RequirementsPage from "./pages/RequirementsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import VersionPage from "./pages/VersionPage";


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
        <Route path="/version-history" element={<VersionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
