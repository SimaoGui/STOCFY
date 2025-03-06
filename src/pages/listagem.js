import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/list.module.scss";


const TabelaProdutos = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [menuAberto, setMenuAberto] = useState(null);
  const [todosSelecionados, setTodosSelecionados] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    sessionStorage.removeItem("auth");
    window.location.href = "/login";
  };

  const adicionarProduto = () => {
    sessionStorage.setItem("auth", true);
    navigate("/adicionarProduto");
  };

  const toggleSelecionado = (id) => {
    const updatedProdutos = produtos.map((produto) =>
      produto.id_item === id
        ? { ...produto, selecionado: !produto.selecionado }
        : produto
    );
    setProdutos(updatedProdutos);
    setTodosSelecionados(updatedProdutos.every((produto) => produto.selecionado));
  };

  const toggleSelecionarTodos = () => {
    const newValue = !todosSelecionados;
    setTodosSelecionados(newValue);
    setProdutos(produtos.map((produto) => ({ ...produto, selecionado: newValue })));
  };

  const handleRemoverSelecionados = async () => {
    const selecionados = produtos.filter((produto) => produto.selecionado);
    if (selecionados.length === 0) {
      console.log("Nenhum produto selecionado para remoção.");
      return;
    }
    try {
      const token = sessionStorage.getItem("token");
      const ids = selecionados.map((produto) => produto.id_item);

      const response = await fetch("https://app.stocfy.com/apagar_itens", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ ids: ids }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao remover itens: ${response.status}`);
      }

      setProdutos(produtos.filter((produto) => !produto.selecionado));
      console.log("Produtos removidos com sucesso!");
    } catch (error) {
      console.error("Erro ao remover os produtos selecionados:", error);
    }
  };

  const handleEditarSelecionado = (id_item) => {
    console.log("Editar produto com id:", id_item);
    navigate("/editarProduto", { state: { id_item } });
  };

  useEffect(() => {
    const handleLister = async (e) => {
      const id_cliente = sessionStorage.getItem("id_cliente") || "";

      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch("https://app.stocfy.com/listar_itens", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();

        const produtosFiltrados = data.map(
          ({ nome, categoria, sku, id_item, codigo_barras }) => ({
            id_item,
            nome,
            categoria,
            sku,
            codigo_barras,
            selecionado: false,
          })
        );

        setProdutos(produtosFiltrados);
        console.log(data);
      } catch (error) {
        console.error("Erro ao buscar os itens:", error);
      }
    };

    handleLister();
  }, []);

  return (
    <main>
      <div className={styles.containerList}>
        <div className={styles.mainDiv}>
          <div className={styles.searchDiv}>
            <i className="bx bx-search" id={styles.icon1}></i>
            <input
              type="text"
              placeholder="Pesquisar Produtos"
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={styles.addButton} onClick={adicionarProduto}>
              + Adicionar Produto
            </button>

          </div>

          <div className={styles.tableDiv}>
            <table className={styles.tabela}>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={todosSelecionados}
                      onChange={toggleSelecionarTodos}
                      className={styles.checkbox}
                    />
                  </th>
                  <th>ID</th>
                  <th>Produto</th>
                  <th>Categoria</th>
                  <th>Sku</th>
                  <th>Código de Barras</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.length > 0 ? (
                  produtos.map((produto) => (
                    <tr key={produto.id_item}>
                      <td>
                        <input
                          type="checkbox"
                          checked={produto.selecionado}
                          onChange={() => toggleSelecionado(produto.id_item)}
                          className={styles.checkbox}
                        />
                      </td>
                      <td>{produto.id_item}</td>
                      <td>{produto.nome}</td>
                      <td>{produto.categoria}</td>
                      <td>{produto.sku}</td>
                      <td>{produto.codigo_barras}</td>
                      <td style={{ position: "relative" }}>
                        <button
                          className={styles.menuButton}
                          onClick={() =>
                            setMenuAberto(
                              menuAberto === produto.id_item
                                ? null
                                : produto.id_item
                            )
                          }
                        >
                          ⋮
                        </button>
                        {menuAberto === produto.id_item && (
                          <div className={styles.dropdownMenu}>
                            {/* Aqui, os botões do dropdown também usam as funções globais */}
                            <button
                              className={styles.EditarBtn}
                              onClick={(e) => {
                                e.preventDefault(); // Evita problemas caso esteja dentro de um form
                                if (produto.id_item) {
                                  handleEditarSelecionado(produto.id_item);
                                } else {
                                  console.error("ID do produto não encontrado!");
                                }
                              }}
                            >
                              Editar
                            </button>

                            <button
                              className={styles.RemoverBtn}
                              onClick={handleRemoverSelecionados}
                            >
                              Remover
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      Nenhum produto encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TabelaProdutos;