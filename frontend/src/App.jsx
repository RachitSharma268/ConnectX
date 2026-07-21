import Landing from "../pages/landing";
import Authentication from "../pages/authentication";
import { AuthProvider } from "../context/AuthContext.jsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Authentication />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
