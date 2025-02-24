import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/home.module.css";

const TabelaProdutos = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]); // Armazena os produtos
  const [menuAberto, setMenuAberto] = useState(null);
  const [todosSelecionados, setTodosSelecionados] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    sessionStorage.removeItem("auth");
    window.location.href = "/login";
  };

  const adicionarProduto = () => {
    navigate("/adicionarProduto");
  };

  // Alterna a seleção de um produto individual
  const toggleSelecionado = (id) => {
    const updatedProdutos = produtos.map((produto) =>
      produto.id_item === id
        ? { ...produto, selecionado: !produto.selecionado }
        : produto
    );
    setProdutos(updatedProdutos);
    setTodosSelecionados(updatedProdutos.every((produto) => produto.selecionado));
  };

  // Alterna a seleção de todos os produtos
  const toggleSelecionarTodos = () => {
    const newValue = !todosSelecionados;
    setTodosSelecionados(newValue);
    setProdutos(produtos.map((produto) => ({ ...produto, selecionado: newValue })));
  };

  // Filtra os produtos com base no termo digitado
  const filteredProdutos = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.codigo_barras.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Remove TODOS os produtos selecionados
  const handleRemoverSelecionados = async () => {
    const selecionados = produtos.filter((produto) => produto.selecionado);
    if (selecionados.length === 0) {
      console.log("Nenhum produto selecionado para remoção.");
      return;
    }
    try {
      const token = sessionStorage.getItem("token");
      const ids = selecionados.map((produto) => produto.id_item);

      // Envia os ids dos itens a serem removidos
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

      // Atualiza o estado removendo os produtos selecionados
      setProdutos(produtos.filter((produto) => !produto.selecionado));
      console.log("Produtos removidos com sucesso!");
    } catch (error) {
      console.error("Erro ao remover os produtos selecionados:", error);
    }
  };

  // Edita TODOS os produtos selecionados
  // Alteração na função handleEditarSelecionado
  const handleEditarSelecionado = (id_item) => {
    console.log("Editar produto com id:", id_item);
    // Aqui você pode navegar para a página de edição do produto específico
    // Exemplo: navegar para uma rota de edição passando o id_item
    navigate("/editarProduto", { state: { id_item } });
  };

  useEffect(() => {
    const handleLister = async () => {
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

        // Filtra apenas os campos desejados e adiciona "selecionado" como false
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
      <button className={styles.Btn} onClick={handleLogout}>
        <div className={styles.sign}>
          <svg viewBox="0 0 512 512">
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
          </svg>
        </div>
        <div className={styles.text}>Logout</div>
      </button>

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
                              onClick={handleEditarSelecionado(produto.id_item)}
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
