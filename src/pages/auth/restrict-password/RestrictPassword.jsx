import { useState } from "react";
import ReturnArrow from "../../../components/return-arrow/ReturnArrow";
import "./RestrictPassword.css";
import Snackbar from "../../../components/snackbar/Snackbar";
import { useLocation, useNavigate } from "react-router-dom";
import { updateSenhaRestrita } from "../../../services/sql/enterprise/Enterprise";
import { insertEmpresa } from "../../../services/sql/enterprise/Enterprise";

function RestrictPassword() {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const navigate = useNavigate();
  const location = useLocation();
  const { lastPage } = location.state || {};

  const onLogin = JSON.parse(sessionStorage.getItem("onLogin"));
  const onLogon = JSON.parse(sessionStorage.getItem("onLogon"));

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [snackbar, setSnackbar] = useState({
    title: "",
    message: "",
    type: "",
    visible: false,
  });

  const testPassword = () =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]).{8,}$/.test(
      password
    );

  const showSnackbar = async (title, message, type) => {
    setSnackbar({ title, message, type, visible: true });
    await sleep(4000);
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  const navigateHome = async () => {
    if (!password || !confirmPassword) {
      showSnackbar("Erro", "Preencha todos os campos.", "error");
      return;
    }
    if (!testPassword()) {
      showSnackbar(
        "Erro",
        "A senha deve ter pelo menos 8 caracteres, 1 símbolo, 1 letra maiúscula e 1 número.",
        "error"
      );
      return;
    }
    if (password !== confirmPassword) {
      showSnackbar("Erro", "As duas senhas devem ser iguais.", "error");
      return;
    }

    let empresa = {};

    if (onLogin) {
      empresa = onLogin;
      try {
        await updateSenhaRestrita(onLogin.id, password);
      } catch (err) {
        showSnackbar(
          "Erro",
          "Houve um erro. Tente novamente mais tarde.",
          "error"
        );
        return;
      }
    } else if (onLogon) {
      empresa = onLogon;

      if (empresa.plan == "premium") {
        try {
          await updateSenhaRestrita(onLogon.id, password);
        } catch (err) {
          showSnackbar(
            "Erro",
            "Houve um erro. Tente novamente mais tarde.",
            "error"
          );
          return;
        }
      } else {
        try {
          empresa = await insertEmpresa(
            empresa.cnpj,
            empresa.name,
            empresa.password,
            password,
            empresa.image,
            empresa.email,
            empresa.sector,
            "",
            1
          );
        } catch (err) {
          showSnackbar(
            "Erro",
            "Houve um erro. Tente novamente mais tarde.",
            "error"
          );
          // setIsLoading(false);
          return;
        }

        empresa.plan = "gratis";
      }
    }

    localStorage.setItem("user", JSON.stringify(empresa));
    sessionStorage.removeItem("onLogon");
    sessionStorage.removeItem("onLogin");

    navigate("/home");
  };

  return (
    <section className="restrict-password-section">
      <Snackbar
        type={snackbar.type}
        title={snackbar.title}
        message={snackbar.message}
        isVisible={snackbar.visible}
      />
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
            className={`restrict-password-input ${
              passwordError ? "error" : ""
            }`}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            id="password"
          />
          <input
            className={`restrict-password-input ${confirmError ? "error" : ""}`}
            type="password"
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirmar senha"
            id="confirmPassword"
          />
          <button
            className="restrict-password-navigate-code"
            type="button"
            onClick={navigateHome}
          >
            Avançar
          </button>
        </form>
      </div>
    </section>
  );
}

export default RestrictPassword;
