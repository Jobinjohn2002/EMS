// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RequirementsPage from "./pages/RequirementsPage";
import ReqassumptionPage from "./pages/ReqassumptionPage";
import VersionPage from "./pages/VersionPage";
import LoginPage from "./pages/LoginPage";


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        {/* Home/Landing */}
        <Route path="/landing" element={<LandingPage />} />

        {/* Static Requirements Page */}
        <Route path="/requirements" element={<RequirementsPage />} />

        {/* Project Details Page */}
        <Route path="/project/:projectId" element={<ReqassumptionPage />} />
        <Route path="/version-history" element={<VersionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
