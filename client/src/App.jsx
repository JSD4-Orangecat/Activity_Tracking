import "./assets/styles/App.css";
import HomePage from "./pages/HomePage";
import CreateCard from "./pages/CreateCard";
import Dashboard from "./pages/DashBoard";
import EditCard from "./pages/EditCard";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";

import FormRegister from "./pages/RegisterPage";

import ReadCard from "./pages/ReadCard";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/register" element={<FormRegister />} />

        <Route path="/login" element={<Login />} />
        <Route path="/createcard" element={<CreateCard />} />
        <Route path="/editcard" element={<EditCard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/readcard" element={<ReadCard />} />

      </Routes>
    </div>
  );
}

export default App;
