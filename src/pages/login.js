import { useState, useEffect } from "react";
import "../styles/global.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  
  useEffect(() => {
    const wrapper = document.querySelector(".wrapper");
    const registerLink = document.querySelector(".register-link");
    const loginLink = document.querySelector(".login-link");

    
    const handleRegisterClick = () => {
      wrapper.classList.add("active");
    };

    const handleLoginClick = () => {
      wrapper.classList.remove("active");
    };

    if (registerLink) {
      registerLink.addEventListener("click", handleRegisterClick);
    } else {
      console.error("Elemento .register-link não encontrado");
    }

    if (loginLink) {
      loginLink.addEventListener("click", handleLoginClick);
    }

    
    return () => {
      if (registerLink) {
        registerLink.removeEventListener("click", handleRegisterClick);
      }
      if (loginLink) {
        loginLink.removeEventListener("click", handleLoginClick);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Email:", email);
  };

  return (
    <div className="wrapper">
      <div className="bg-animate"></div>
      <div className="bg-animate2"></div>  

      
      <div className="form-box login">
        <h2 className="animation" style={{ "--i": 0, "--j": 21 }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box animation" style={{ "--i": 1, "--j": 22 }}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Username</label>
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box animation" style={{ "--i": 2, "--j": 23}}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
            <i className="bx bxs-lock-alt"></i>
          </div>
          <button type="submit" className="btn animation " style={{ "--i": 3, "--j": 24}}>Login</button>
          <div className="register-link-div animation" style={{ "--i": 4, "--j": 25}}>
            <p>
              Não tem uma conta?{" "}
              <a href="#" className="register-link">Registrar-se</a>
            </p>
          </div>
        </form>
      </div>
      <div className="info-text login">
        <h2 className="animation" style={{ "--i": 0, "--j": 21 }}>Bem vindo de volta!</h2>
        <p className="animation" style={{ "--i": 1, "--j": 22 }}>Syncfy - Sincronização Inteligente Para Suas Vendas</p>
      </div>

      
      <div className="form-box register">
        <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>Registrar</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box animation" style={{ "--i": 18, "--j": 1 }}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Username</label>
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box animation" style={{ "--i": 19, "--j": 2 }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>E-mail</label>
            <i className="bx bxs-envelope"></i>
          </div>
          <div className="input-box animation" style={{ "--i": 20, "--j": 3 }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
            <i className="bx bxs-lock-alt"></i>
          </div>
          <button type="submit" className="btn animation" style={{ "--i": 21, "--j": 4 }}>Registrar-se</button>
          <div className="login-link-div animation" style={{ "--i": 22, "--j": 5 }}>
            <p>
              Já tem uma conta?{" "}
              <a href="#" className="login-link">Login</a>
            </p>
          </div>
        </form>
      </div>
      <div className="info-text register">
        <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>Pimeiro acesso?</h2>
        <p className="animation" style={{ "--i": 18, "--j": 1 }}>Syncfy - Sincronização Inteligente Para Suas Vendas</p>
      </div>
    </div>
  );
};

export default Login;
