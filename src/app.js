import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login.js";
import Verify from "./pages/verify.js";
import TabelaProdutos from "./pages/listagem.js";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/listagem" element={<TabelaProdutos />} />
      </Routes>
    </Router>
  );
}

export default App;
