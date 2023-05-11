import "./assets/styles/App.css";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import FormRegister from "./pages/RegisterPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<FormRegister />} />
      </Routes>
    </div>
  );
}

export default App;
