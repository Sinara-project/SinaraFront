import "./LoginConfirm.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReturnArrow from "../../../components/return-arrow/ReturnArrow";
import Snackbar from "../../../components/snackbar/Snackbar";

function LoginConfirm() {
  const navigate = useNavigate();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const trueCode = "1234";

  const [code, setCode] = useState("");
  const [snackbar, setSnackbar] = useState({
    title: "",
    message: "",
    type: "",
    visible: false,
  });

  const onLogin = JSON.parse(sessionStorage.getItem("onLogin"));

  const email = onLogin.email;

  useEffect(() => {
    const inputs = document.querySelectorAll(".login-confirm-input");

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

    if (inputs.length > 0) inputs[0].focus();
  }, []);

  const showSnackbar = async (title, message, type) => {
    setSnackbar({ title, message, type, visible: true });
    await sleep(4000);
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  const login = () => {
    console.log(code);

    if (!code) {
      showSnackbar("Erro", "O código está vazio.", "error");
      return;
    }

    if (code != trueCode) {
      showSnackbar("Erro", "O código informado está incorreto.", "error");
      return;
    }

    if (onLogin.restrictPassword) {
      const data = {
        id: onLogin.id,
        cnpj: onLogin.cnpj,
        name: onLogin.name,
        image: onLogin.image,
      };
      localStorage.setItem("user", JSON.stringify(data));
      sessionStorage.removeItem("onLogin");
      navigate("/home");
    } else {
      const data = {
        id: onLogin.id,
        cnpj: onLogin.cnpj,
        name: onLogin.name,
        image: onLogin.image,
      };
      sessionStorage.setItem("onLogin", JSON.stringify(data));
      navigate("/senha-restrita");
    }
  };

  return (
    <section className="login-confirm-section">
      <ReturnArrow lastEndpoint={"/entrar"} />
      <Snackbar
        type={snackbar.type}
        title={snackbar.title}
        message={snackbar.message}
        isVisible={snackbar.visible}
      />

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
          <button
            className="login-confirm-advance"
            type="button"
            onClick={login}
          >
            Fazer login
          </button>
        </form>
        <p className="login-confirm-resend">Reenviar código</p>
      </div>
    </section>
  );
}

export default LoginConfirm;
