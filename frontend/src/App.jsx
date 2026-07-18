import Landing from "../pages/landing";
import Authentication from "../pages/authentication";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Authentication />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
