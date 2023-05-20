import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./Login";
import FormRegister from "./RegisterPage";
// import Profile from "./Profile";
import { useAuth } from "../contexts/authentication";
function UnauthenticatedApp() {
  const { currentUser } = useAuth();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<FormRegister />} />
        {/* <Route path={`/profile/${currentUser._id}`} element={<Profile />} />
        <Route path={`/profile/:id`} element={<Profile />} /> */}

        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path={`/profile/${currentUser._id}`} element={<Profile />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;
