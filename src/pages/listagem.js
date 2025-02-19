import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/home.module.css';

const TabelaProdutos = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([
    { id: 1, nome: "Produto 1", data: "19/02/2025", estoque: 10, preco: 50, selecionado: false },
  ]);

  const [menuAberto, setMenuAberto] = useState(null);

  const adicionarProduto = () => {
    navigate('/adicionarProduto');
  };

  const removerProduto = (id) => {
    setProdutos(produtos.filter((produto) => produto.id !== id));
    setMenuAberto(null);
  };

  const editarProduto = (id) => {
    console.log(`Editar produto ${id}`);
    setMenuAberto(null);
  };

  return (
    <div className={styles.containerList}>
      <div className={styles.mainDiv}>
        <div className={styles.searchDiv}>
          <i className='bx bx-search'></i>
          <input type='text' placeholder='Pesquisar Produtos' className={styles.searchInput} />
          <button className={styles.addButton} onClick={adicionarProduto}>
            + Adicionar Produto
          </button>
        </div>
        
        <div className={styles.tableDiv}>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th></th>
                <th>Produto</th>
                <th>Data</th>
                <th>Estoque</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={produto.selecionado}
                      onChange={() => {
                        setProdutos(produtos.map(p =>
                          p.id === produto.id ? { ...p, selecionado: !p.selecionado } : p
                        ));
                      }}
                      className={styles.checkbox}
                    />
                  </td>
                  <td>{produto.nome}</td>
                  <td>{produto.data}</td>
                  <td>{produto.estoque}</td>
                  <td>R$ {produto.preco}</td>
                  <td style={{ position: "relative" }}>
                    <button
                      className={styles.menuButton}
                      onClick={() => setMenuAberto(menuAberto === produto.id ? null : produto.id)}
                    >
                      ⋮
                    </button>
                    {menuAberto === produto.id && (
                      <div className={styles.dropdownMenu}>
                        <button className={styles.EditarBtn} onClick={() => editarProduto(produto.id)}>Editar</button>
                        <button className={styles.RemoverBtn} onClick={() => removerProduto(produto.id)}>Remover</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TabelaProdutos;