import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginSignup from "./LoginSignup.jsx";
import Home from "./home.jsx";
import About from "./About.jsx";

export default function App() {
  const isAuthenticated = localStorage.getItem("auth") === "true";

  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<LoginSignup />} />

        {/* Home only if logged in */}
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />

        <Route path="/about" element={<About />} />

      </Routes>
    </Router>
  );
}
