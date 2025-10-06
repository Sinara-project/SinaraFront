import "./LoginConfirm.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ReturnArrow from "../../../components/return-arrow/ReturnArrow";

function LoginConfirm() {
  const navigate = useNavigate();

  const email = "friboi@gmail.com";

  useEffect(() => {
      document.title = "Login";
  
      const inputs = document.querySelectorAll(".login-confirm-input");
  
      inputs.forEach((input, index) => {
        input.addEventListener("input", () => {
          if (input.value && !/^[0-9]$/.test(input.value)) {
            input.value = "";
            return;
          }
          if (input.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
          }
        });
  
        input.addEventListener("keydown", (event) => {
          if (event.key === "Backspace" && !input.value && index > 0) {
            inputs[index - 1].focus();
          }
        });
      });
    }, []);
  
  return (
    <section className="login-confirm-section">
      <ReturnArrow lastEndpoint={"/entrar"} />
      <div className="login-confirm-container">
        <span className="login-confirm-text-group">
          <h1 className="login-confirm-h1">Conclua o login</h1>
          <p>
            Por favor, digite o código que enviamos agora para{" "}
            <strong>{email}</strong>
          </p>
        </span>
        <form className="login-confirm-form" action="submit">
          <div className="login-confirm-input-group">
            <input className="login-confirm-input" type="text" maxLength="1" />
            <input className="login-confirm-input" type="text" maxLength="1" />
            <input className="login-confirm-input" type="text" maxLength="1" />
            <input className="login-confirm-input" type="text" maxLength="1" />
          </div>
          <button className="login-confirm-advance" type="button">
            Fazer login
          </button>
        </form>
        <p className="login-confirm-resend">Reenviar código</p>
      </div>
    </section>
  );
}

export default LoginConfirm;
