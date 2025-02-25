import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login.js";
import Verify from "./pages/verify.js";
import TabelaProdutos from "./pages/listagem.js";
import ProtectedRoute from "./pages/ProtectedRoute.js";
import AdicionarProduto from "./pages/adicionarProduto.js";
import EditarProduto from "./pages/editarProduto.js";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redireciona da raiz para /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Página de Login (pública) */}
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/verify" element={<Verify />} />
          <Route path="/listagem" element={<TabelaProdutos />} />
          <Route path="/adicionarProduto" element={<AdicionarProduto />} />
          <Route path="/editarProduto" element={<EditarProduto />} />
        </Route>

        {/* Redireciona qualquer rota desconhecida para o login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
