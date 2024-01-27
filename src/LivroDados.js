import { useState } from 'react';
import { ControleEditora } from './controle/ControleEditora';
import { ControleLivros } from './controle/ControleLivros';
import { useNavigate } from 'react-router-dom';
import "../src/App.css"
const controleLivro = new ControleLivros();
  const controleEditora = new ControleEditora();

export default function LivroDados() {
  
  const opcoes = controleEditora.getEditoras().map((editora) => ({
    value: editora.codEditora,
    text: editora.nome,
  }));

  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [autores, setAutores] = useState("");
  const [codEditora, setCodEditora] = useState(opcoes[0].value);

  const navigate = useNavigate();

  function tratarCombo(event) {
    const value = Number(event.target.value);
    setCodEditora(value);
  }

  function incluir(event) {
    event.preventDefault();

    const livro = {
      codigo: 0,
      titulo: titulo,
      resumo: resumo,
      autores: autores.split("\n"),
      codEditora: codEditora,
    };

    controleLivro.incluir(livro);

    navigate("/");
  }

  return (
    <main className="container">
      <h1>Dados do Livro</h1>
      <form onSubmit={incluir}>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="resumo">Resumo:</label>
          <textarea
            id="resumo"
            className="form-control"
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="autores">Autores:</label>
          <textarea
            id="autores"
            className="form-control"
            value={autores}
            onChange={(e) => setAutores(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="codEditora">Editora:</label>
          <select
            id="codEditora"
            className="form-control"
            value={codEditora}
            onChange={tratarCombo}
          >
            {opcoes.map((opcao) => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.text}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Salvar Dados
        </button>
      </form>
    </main>
  );
}