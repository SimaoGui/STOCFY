import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/verify.scss";


const Verify = () => {
    const email = localStorage.getItem("email");
    const navigate = useNavigate(); 
    

    useEffect(() => {
    const inputs = document.querySelectorAll(".code");

    inputs.forEach((input, index) => {
      
      input.addEventListener("input", (e) => {
        
        e.target.value = e.target.value.replace(/\D/g, "");

       
        if (e.target.value.length > 1) {
          e.target.value = e.target.value.slice(0, 1);
        }

        
        if (e.target.value.length === 1 && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });

      
      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !input.value && index > 0) {
          inputs[index - 1].focus();
        }
      });
    });

    
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("input", () => {});
        input.removeEventListener("keydown", () => {});
      });
    };
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();

    const inputs = document.querySelectorAll(".code");
    let verificationCode = "";

    inputs.forEach((input) => {
      verificationCode += input.value;
    });

    if (verificationCode.length !== 6) {
      console.error("O código precisa ter 6 dígitos.");
      return;
    }

    console.log("Código de verificação:", verificationCode);

    try {
        const response = await fetch("https//app.stocfy.com/verificar_codigo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, codigo: verificationCode })
          });
          const data = await response.json();
          console.log("Resposta da verificação:", data);
          if (response.ok) {
            console.log("Registro bem-sucedido:", data);
            alert("Email verificado com sucesso!")
            navigate("/login")
          } else {
            console.error("Erro ao fazer login:", data.message);
          }


    } catch (error) {
        console.error("Erro na verificação:", error);
        }

}

  return (
    <form onSubmit={handleVerify} className='container'>
      <h2>Verifique Sua Conta</h2>
      <p>
        Enviamos um código de 6 dígitos para: {email}<br />
        Insira o código abaixo para confirmar o email.
      </p>

      <div className='codeContainer'>
        <input type='number' className='code' min={0} max={9} required />
        <input type='number' className='code' min={0} max={9} required />
        <input type='number' className='code' min={0} max={9} required />
        <input type='number' className='code' min={0} max={9} required />
        <input type='number' className='code' min={0} max={9} required />
        <input type='number' className='code' min={0} max={9} required />
      </div>

      <button className="btn" type="submit">Verificar</button>
    </form>
  );
};

export default Verify;
