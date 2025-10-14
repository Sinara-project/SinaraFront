import { useState } from "react";
import ReturnArrow from "../../../components/return-arrow/ReturnArrow";
import "./RestrictPassword.css";
import Snackbar from "../../../components/snackbar/Snackbar";
import { useLocation, useNavigate } from "react-router-dom";

function RestrictPassword() {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const navigate = useNavigate();
  const location = useLocation()
  const { lastPage } = location.state || {};

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);

  const testPassword = () =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]).{8,}$/.test(
      password
    );

  const [snackbar, setSnackbar] = useState({
    title: "",
    message: "",
    type: "",
    visible: false,
  });

  const showSnackbar = async (title, message, type, timeSleeping) => {
    setSnackbar({ title, message, type, visible: true });
    await sleep(4000);
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  const navigateHome = () => {
    if(!confirmPassword || !password) {
      showSnackbar("Erro", "Preencha todos os campos.", "error", 2000);
      return;
    }
    if (!testPassword()) {
      showSnackbar("Erro", "A senha deve ter pelo menos 8 caracteres, 1 símbolo, 1 letra maiúscula e 1 número.", "error", 2000);
      return;
    }
    if (confirmPassword != password) {
      showSnackbar("Erro", "As duas senhas devem ser iguais.", "error", 2000);
      return;
    }

    // Buscar nome da empresa por CNPJ e colocar no localStorage para garantir login
    localStorage.setItem("currentCNPJ", sessionStorage.getItem("inLogonCNPJ"));
    navigate("/home");
  }

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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Senha"
            id="password"
          />
          <input
            className={`restrict-password-input ${confirmError ? "error" : ""}`}
            type="password"
            onChange={(e) => {
              setConfirm(e.target.value);
            }}
            placeholder="Confirmar senha"
            id="confirmPassword"
          />
          <button className="restrict-password-navigate-code" type="button" onClick={navigateHome}>
            Avançar
          </button>
        </form>
      </div>
    </section>
  );
}

export default RestrictPassword;
