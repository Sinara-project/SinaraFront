import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LogonInsertCode.css";
import ReturnArrow from "../../../components/return-arrow/ReturnArrow";

function LogonInsertCode() {
  const navigate = useNavigate();

  const email = "friboi@gmail.com";

  useEffect(() => {
    document.title = "Cadastro";

    const inputs = document.querySelectorAll(".code-input");

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

  const navigatePlanChoice = () => {
    localStorage.setItem("lastEndpoint", "/inserir-codigo");
    navigate("/escolher-plano");
  }

  return (
    <section className="code-section">
      <ReturnArrow lastEndpoint={"/"} />
      <div className="code-container">
        <span className="code-text-group">
          <h1 className="code-h1">Conclua o cadastro</h1>
          <p>
            Por favor, digite o código que enviamos agora para{" "}
            <strong>{email}</strong>
          </p>
        </span>
        <form className="code-form" action="submit">
          <div className="code-input-group">
            <input className="code-input" type="text" maxLength="1" />
            <input className="code-input" type="text" maxLength="1" />
            <input className="code-input" type="text" maxLength="1" />
            <input className="code-input" type="text" maxLength="1" />
          </div>
          <button className="code-advance" onClick={navigatePlanChoice} type="button">Fazer cadastro</button>
        </form>
        <p className="code-resend">Reenviar código</p>
      </div>
    </section>
  );
}

export default LogonInsertCode;
