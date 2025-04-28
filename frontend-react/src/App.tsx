import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Toast from "./components/Toast";

export default function App() {
  return (
    <Router>
      <Toast />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />
        {/* <Route path="/" element={<LandingPage />} /> */}
      </Routes>
    </Router>
  );
}
