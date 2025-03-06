import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/add.module.scss";

const AdicionarProduto = () => {

  const [produto, setProduto] = useState({
    categoria: "",
    codigo_barras: "",
    descricao: "",
    id_cliente: "",
    nome: "",
    preco: 0,
    quantidade: 0,
    sku: "",
    tp_unidade: "",
    unidade: 0
  });

  useEffect(() => {
    const idCliente = parseInt(sessionStorage.getItem("id_cliente") || "0", 10);
    setProduto((prevProduto) => ({ ...prevProduto, id_cliente: idCliente }));
  }, []);
    

  const navigate = useNavigate();  

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setProduto((prevProduto) => ({
      ...prevProduto,
      [name]: 
        name === "preco" ? parseFloat(value) || 0 
        : name === "quantidade" ? parseInt(value, 10) || 0 
        : name === "unidade" ? parseInt(value, 10) || 0
        : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const produtoFormatado = {
      ...produto,
      preco: parseFloat(produto.preco) || 0, 
      quantidade: parseInt(produto.quantidade, 10) || 0,
      unidade: parseInt(produto.unidade, 10) || 0
    };
  
    console.log("Produto a ser enviado:", produtoFormatado);
  
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("https://app.stocfy.com/cadastrar_item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(produtoFormatado),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao cadastrar produto");
      }
  
      const data = await response.json();
      console.log("Sucesso:", data);
      navigate("/listagem");
    } catch (error) {
      console.error("Erro ao adicionar o produto:", error);
    }
  };
  
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Adicionar Produto</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.nome}>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={produto.nome}
            onChange={handleChange}
            placeholder="Digite o nome do produto"
            required
          />
        </div>

        <div className={styles.categoria}>
          <label htmlFor="categoria">Categoria</label>
          <input
            type="text"
            id="categoria"
            name="categoria"
            value={produto.categoria}
            onChange={handleChange}
            placeholder="Digite a categoria"
            required
          />
        </div>

        <div className={styles.codigo_barras}>
          <label htmlFor="codigo_barras">Código de Barras</label>
          <input
            type="text"
            id="codigo_barras"
            name="codigo_barras"
            value={produto.codigo_barras}
            onChange={handleChange}
            placeholder="Digite o código de barras"
            required
          />
        </div>

        <div className={styles.descricao}>
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            value={produto.descricao}
            onChange={handleChange}
            placeholder="Descreva o produto"
            required
          ></textarea>
        </div>

        <div className={styles.preco}>
          <label htmlFor="preco">Preço</label>
          <input
            type="number"
            step="0.01"
            id="preco"
            name="preco"
            value={produto.preco}
            onChange={handleChange}
            placeholder="Digite o preço"
            required
          />
        </div>

        <div className={styles.quantidade}>
          <label htmlFor="quantidade">Quantidade</label>
          <input
            type="number"
            id="quantidade"
            name="quantidade"
            value={produto.quantidade}
            onChange={handleChange}
            placeholder="Digite a quantidade"
            required
          />
        </div>

        <div className={styles.sku}>
          <label htmlFor="sku">SKU</label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={produto.sku}
            onChange={handleChange}
            placeholder="Digite o SKU"
            required
          />
        </div>

        <div className={styles.unidade}>
          <label htmlFor="unidade">Unidade</label>
          <input
            type="number"
            id="unidade"
            name="unidade"
            value={produto.unidade}
            onChange={handleChange}
            placeholder="Digite a unidade"
            required
          />
        </div>

        <div className={styles.tp_unidade}>
          <label htmlFor="tp_unidade">Tipo de Unidade</label>
          <input
            type="text"
            id="tp_unidade"
            name="tp_unidade"
            value={produto.tp_unidade}
            onChange={handleChange}
            placeholder="Digite o tipo de unidade"
            required
          />
        </div>

        <div className={styles.submit}>
          <button className={styles.addbtn} type="submit">Adicionar Produto</button>
        </div>
      </form>
    </div>
  );
};

export default AdicionarProduto;
