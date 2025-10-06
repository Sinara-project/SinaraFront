import ReturnArrow from "../../../components/return-arrow/ReturnArrow";
import "./RestrictPassword.css";
import { useLocation } from "react-router-dom";

function RestrictPassword() {
    const location = useLocation()
    const { lastPage } = location.state || {}

  return (
    <section className="restrict-password-section">
        {lastPage === "plan-choice" && (
            <ReturnArrow lastEndpoint={"/escolher-plano"} />
        )}
      <div className="restrict-password-container">
        <span className="restrict-password-text-group">
          <h1 className="restrict-password-h1">Área restrita</h1>
          <p>Crie a senha da sua área restrita</p>
        </span>
        <form className="restrict-password-form" action="submit">
          <input
            className="restrict-password-input"
            type="password"
            placeholder="Senha"
            id="password"
          />
          <input
            className="restrict-password-input"
            type="password"
            placeholder="Confirmar senha"
            id="confirmPassword"
          />
          <button className="restrict-password-navigate-code" type="button">
            Avançar
          </button>
        </form>
      </div>
    </section>
  );
}

export default RestrictPassword;
