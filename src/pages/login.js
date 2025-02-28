import { useState, useEffect } from "react";

import { useNavigate } from 'react-router-dom';
import styles from "../styles/global.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  localStorage.setItem("email", email);
  const [role, setRole] = useState(1);
  const navigate = useNavigate(); 
  const [active, setActive] = useState(false);
  
    const handleSignUpClick = () => {
      setActive(true);
    };
  
    const handleSignInClick = () => {
      setActive(false);
    };

  
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

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      console.log(JSON.stringify({
        email: email,
        senha: password,
      }));

      const response = await fetch("https://app.stocfy.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          senha: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login bem-sucedido:", data);
        sessionStorage.setItem("auth", "true");
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("id_cliente", data.id_cliente);
        navigate("/listagem");
    } else {
        console.log("Erro no login");
    }
    
    } catch (error) {
      console.error("Erro na requisição:", error);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const payload = JSON.stringify({
        nome: username,
        email: email,
        senha: password,
        id_tpclient: role, // Já está como número
      });
      console.log(payload);
      
      const response = await fetch("https://app.stocfy.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: username,
          email: email,
          senha: password,
          id_tpcliente: role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registro bem-sucedido:", data);
        navigate("/verify")
        
      } else {
        console.error("Erro ao fazer login:", data.message);
      };
    } catch (error) {
      console.error("Erro na requisição:", error);
    };
  };

  return (

    <main>
      <div className="texto-info">
        <h2 className="animation" style={{ "--i": 0, "--j": 21 }}>Bem vindo ao Stocfy</h2>
        <p className="animation" style={{ "--i": 1, "--j": 22 }}>Sincronização Inteligente Para Suas Vendas</p>
      </div>

      <div className={`mobile ${active ? "active" : ""}`}>  
        
        <input type="checkbox" id="chk" className="chk" aria-hidden="true" checked={active} onChange={() => setActive(!active)} />
        
        <div className="login">
          <form className="form" onSubmit={handleLogin}>
            <label htmlFor="chk" aria-hidden="true">Login</label>
            <input className="input" type="email" name="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="input" type="password" name="password" placeholder="Senha" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
          </form>
        </div>

        <div className="register">
          <form className="form" onSubmit={handleRegister}>
            <label htmlFor="chk" aria-hidden="true">Registrar</label>
            <input className="input" type="text" name="name" placeholder="Nome" required value={username} onChange={(e) => setUsername(e.target.value)} />
            <input className="input" type="email" name="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="input" type="password" name="password" placeholder="Senha" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button>Registrar</button>
          </form>
        </div>
      </div>


    <div className="wrapper">
      <div className="bg-animate"></div>
      <div className="bg-animate2"></div>  

      
      <div className="form-box login">
        <h2 className="animation" style={{ "--i": 0, "--j": 21 }}>Login</h2>
        <form onSubmit={handleLogin}>
        <div className="input-box animation" style={{ "--i": 1, "--j": 22 }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="new-password"
              required
            />
            <label>E-mail</label>
            <i className="bx bxs-envelope"></i>
          </div>
          <div className="input-box animation" style={{ "--i": 2, "--j": 23}}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
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
        <form onSubmit={handleRegister}>
          <div className="input-box animation" style={{ "--i": 18, "--j": 1 }}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="new-password"
              required
            />
            <label>Nome</label>
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box animation" style={{ "--i": 19, "--j": 2 }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="new-password"
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
              autoComplete="new-password"
              required
            />
            <label>Password</label>
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="input-boxR animation" style={{ "--i": 21, "--j": 4 }}>
            <label>
              <input
                type="radio"
                name="role"
                value="1"
                checked={role === 1}
                onChange={(e) => setRole(Number(e.target.value))}
              />
              <span>Fornecedor</span>
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="2"
                checked={role === 2}
                onChange={(e) => setRole(Number(e.target.value))}
              />
              <span>Revendedor</span>
            </label>
          </div>
          <button type="submit" className="btn animation" style={{ "--i": 22, "--j": 5 }}>Registrar-se</button>
          <div className="login-link-div animation" style={{ "--i": 23, "--j": 5 }}>
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
    </main>
  );
};

export default Login;