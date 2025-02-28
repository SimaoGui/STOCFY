import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/add.module.css";

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
        <label>Nome</label>
        <input type="text" name="nome" value={sendProduto.nome || ""} onChange={handleChange} required />

        <label>Categoria</label>
        <input type="text" name="categoria" value={sendProduto.categoria || ""} onChange={handleChange} required />

        <label>Código de Barras</label>
        <input type="text" name="codigo_barras" value={sendProduto.codigo_barras || ""} onChange={handleChange} required />

        <label>Descrição</label>
        <textarea name="descricao" value={sendProduto.descricao || ""} onChange={handleChange} required />

        <label>Preço</label>
        <input type="number" step="0.01" name="preco" value={sendProduto.preco || ""} onChange={handleChange} required />

        <label>Quantidade</label>
        <input type="number" name="quantidade" value={sendProduto.quantidade || ""} onChange={handleChange} required />

        <label>SKU</label>
        <input type="text" name="sku" value={sendProduto.sku || ""} onChange={handleChange} required />

        <label>Tipo Unidade</label>
        <input type="text" name="tp_unidade" value={sendProduto.tp_unidade || ""} onChange={handleChange} required />

        <label>Unidade</label>
        <input type="text" name="unidade" value={sendProduto.unidade || ""} onChange={handleChange} required />

        <button type="submit" className={styles.addbtn}>Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EditarProduto;
