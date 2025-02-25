import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/add.module.css";

const AdicionarProduto = () => {
  const [produto, setProduto] = useState({
    nome: "",
    imagem: null,
    descricao: "",
    sku: "",
    estoque: "",
    preco: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagem") {
      setProduto({
        ...produto,
        imagem: files[0]
      });
    } else {
      setProduto({
        ...produto,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", produto.nome);
    formData.append("imagem", produto.imagem);
    formData.append("descricao", produto.descricao);
    formData.append("sku", produto.sku);
    formData.append("estoque", produto.estoque);
    formData.append("preco", produto.preco);

    console.log("Produto a ser enviado:", produto);
    // Exemplo: envio para backend via fetch ou axios
    // fetch('/api/produtos', { method: 'POST', body: formData })

    // Redirecionar após o envio
    // navigate("/listagem");
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

        <div className={styles.imagem}>
          <label htmlFor="imagem">Imagem</label>
          <input
            type="file"
            id="imagem"
            name="imagem"
            onChange={handleChange}
            accept="image/*"
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

        <div className={styles.sku}>
          <label htmlFor="sku">SKU</label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={produto.sku}
            onChange={handleChange}
            placeholder="Código SKU"
            required
          />
        </div>

        <div className={styles.estoque}>
          <label htmlFor="estoque">Quantidade em Estoque</label>
          <input
            type="number"
            id="estoque"
            name="estoque"
            value={produto.estoque}
            onChange={handleChange}
            placeholder="0"
            required
          />
        </div>

        <div className={styles.preco}>
          <label htmlFor="preco">Preço</label>
          <input
            type="text"
            id="preco"
            name="preco"
            value={produto.preco}
            onChange={handleChange}
            placeholder="R$ 0,00"
            required
          />
        </div>

        <div className={styles.submit}>
          <button type="submit">Adicionar Produto</button>
        </div>
      </form>
    </div>
  );
};

export default AdicionarProduto;
