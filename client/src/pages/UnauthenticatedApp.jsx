import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./Login";
import FormRegister from "./RegisterPage";
import Profile from "./Profile";
function UnauthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<FormRegister />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;
