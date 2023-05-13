import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./Login";

function UnauthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;
