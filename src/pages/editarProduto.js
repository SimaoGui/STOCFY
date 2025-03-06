import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/add.module.scss";

const EditarProduto = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id_item } = location.state || {};

  const [produto, setProduto] = useState({
    categoria: "",
    codigo_barras: "",
    descricao: "",
    estoque: {
      preco: 0,
      quantidade: 0,
    },
    id_cliente: 0,
    id_item: id_item || 0,
    nome: "",
    sku: "",
    tp_unidade: "",
    unidade: "",
  });

  const [sendProduto, setSendProduto] = useState({
    categoria: "",
    codigo_barras: "",
    descricao: "",
    id_cliente: 0,
    id_item: id_item || 0,
    nome: "",
    preco: 0,
    quantidade: 0,
    sku: "",
    tp_unidade: "",
    unidade: "",
  });

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        if (!id_item) return;

        const token = sessionStorage.getItem("token");
        const response = await fetch(`https://app.stocfy.com/buscar_item/${id_item}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar produto");
        }

        const data = await response.json();
        if (data.item) {
          const produtoAtualizado = {
            categoria: data.item.categoria || "",
            codigo_barras: data.item.codigo_barras || "",
            descricao: data.item.descricao || "",
            estoque: data.item.estoque || { preco: 0, quantidade: 0 },
            id_cliente: data.item.id_cliente || 0,
            id_item: data.item.id_item || 0,
            nome: data.item.nome || "",
            sku: data.item.sku || "",
            tp_unidade: data.item.tp_unidade || "",
            unidade: data.item.unidade || "",
          };

          setProduto(produtoAtualizado);
          setSendProduto({
            ...produtoAtualizado,
            preco: produtoAtualizado.estoque.preco || 0,
            quantidade: produtoAtualizado.estoque.quantidade || 0,
          });
        }
      } catch (error) {
        console.error("Erro ao buscar o produto:", error);
      }
    };

    fetchProduto();
  }, [id_item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSendProduto((prev) => ({
      ...prev,
      [name]: name === "preco" || name === "quantidade" ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`https://app.stocfy.com/editar_item/${id_item}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sendProduto),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar produto");
      }

      console.log("Produto atualizado com sucesso!");
      navigate("/listagem");
    } catch (error) {
      console.error("Erro ao editar o produto:", error);
    }
  };

  return (
    <div className={styles.container}>
    <h1 className={styles.header}>Editar Produto</h1>
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
          value={sendProduto.preco}
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
          value={sendProduto.quantidade}
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
        <button className={styles.addbtn} type="submit">Editar Produto</button>
      </div>
    </form>
  </div>
  );
};

export default EditarProduto;
