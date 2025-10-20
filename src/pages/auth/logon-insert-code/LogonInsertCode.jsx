import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogonInsertCode.css";
import ReturnArrow from "../../../components/return-arrow/ReturnArrow";
import Snackbar from "../../../components/snackbar/Snackbar";

function LogonInsertCode() {
  const navigate = useNavigate();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const actualLogon = JSON.parse(sessionStorage.getItem("onLogon"));

  const email = "friboi@gmail.com";

  const trueCode = "1234";

  const [code, setCode] = useState("");
  const [snackbar, setSnackbar] = useState({
    title: "",
    message: "",
    type: "",
    visible: false,
  });

  useEffect(() => {
    document.title = "Cadastro";

    const inputs = document.querySelectorAll(".code-input");

    inputs.forEach((input, index) => {
      input.addEventListener("input", () => {
        if (input.value && !/^[0-9]$/.test(input.value)) {
          input.value = "";
          return;
        }
        setCode((prev) => {
          const arr = prev.split("");
          arr[index] = input.value;
          return arr.join("").slice(0, inputs.length);
        });
        if (input.value.length === 1 && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });

      input.addEventListener("keydown", (event) => {
        if (event.key === "Backspace") {
          input.value = "";
          setCode((prev) => {
            const arr = prev.split("");
            arr[index] = "";
            return arr.join("").slice(0, inputs.length);
          });
          if (index > 0) {
            inputs[index - 1].focus();
          }
        }
      });
    });
  }, []);

  const showSnackbar = async (title, message, type) => {
    setSnackbar({ title, message, type, visible: true });
    await sleep(4000);
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  const navigatePlanChoice = () => {
    if (!code) {
      showSnackbar("Erro", "O código está vazio.", "error");
      return;
    }

    if (code != trueCode) {
      showSnackbar("Erro", "O código informado está incorreto.", "error");
      return;
    }

    // salvarEmpresa(cnpj, email, nome, oscarai tudo)
    const id = 1;
    // const id = buscarIdDeEmpresaPorCnpj(actualLogon.cnpj)
    navigate("/escolher-plano");
  };

  return (
    <section className="code-section">
      <Snackbar
        type={snackbar.type}
        title={snackbar.title}
        message={snackbar.message}
        isVisible={snackbar.visible}
      />
      <ReturnArrow lastEndpoint={"/cadastrar"} />
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
          <button
            className="code-advance"
            onClick={navigatePlanChoice}
            type="button"
          >
            Fazer cadastro
          </button>
        </form>
        <p className="code-resend">Reenviar código</p>
      </div>
    </section>
  );
}

export default LogonInsertCode;
