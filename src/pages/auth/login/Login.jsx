import "./Login.css";
import ReturnArrow from "../../../components/return-arrow/ReturnArrow";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const navigateLoginConfirm = () => {
    navigate("/confirmar-entrada")
  }

  const navigateLogon = () => {
    navigate("/cadastrar");
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <span className="login-text-group">
          <h1 className="login-h1">Faça login</h1>
          <p>Faça login como uma empresa!</p>
        </span>
        <form className="login-form" action="submit">
          <input
            className="login-input"
            type="text"
            placeholder="CNPJ"
            id="password"
          />
          <input
            className="login-input"
            type="password"
            placeholder="Confirmar senha"
            id="confirmPassword"
          />
          <button className="login-navigate-code" type="button" onClick={navigateLoginConfirm}>
            Avançar
          </button>
        </form>
        <p className="logon-navigate-login" onClick={navigateLogon}>
          Não possui uma conta? <strong>Cadastre-se!</strong>
        </p>
      </div>
    </section>
  );
}

export default Login;
