import "./Logon.css";
import { useNavigate } from "react-router-dom";
import { use, useEffect } from "react";

function Logon() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Cadastro";
  }, []);

  const navigateInsertCode = () => {
    navigate("/inserir-codigo");
  };

  const navigateLogin = () => {
    navigate("/entrar");
  };

  return (
    <section className="logon-section">
      <div className="logon-container">
        <span className="logon-text-group">
          <h1 className="logon-h1">Faça cadastro</h1>
          <p>Faça o cadastro de sua empresa!</p>
        </span>
        <form className="logon-form" action="submit">
          <span className="logon-input-group">
            <input className="logon-input" type="text" placeholder="CNPJ" />
            <input className="logon-input" type="text" placeholder="Setor" />
          </span>
          <input
            className="logon-input"
            type="text"
            placeholder="E-mail da empresa"
          />
          <input className="logon-input" type="password" placeholder="Senha" />
          <input
            className="logon-input"
            type="password"
            placeholder="Confirmar senha"
          />
          <button
            className="logon-navigate-code"
            onClick={navigateInsertCode}
            type="button"
          >
            Avançar
          </button>
        </form>
        <p className="logon-navigate-login" onClick={navigateLogin}>
          Já tem uma conta? <strong>Faça login!</strong>
        </p>
      </div>
    </section>
  );
}

export default Logon;
