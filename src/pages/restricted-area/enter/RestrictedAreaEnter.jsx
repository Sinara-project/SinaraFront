import "./RestrictedAreaEnter.css";
import Snackbar from "../../../components/snackbar/Snackbar";
import ReturnArrow from "../../../components/return-arrow/ReturnArrow";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RestrictedAreaEnter() {
  const navigate = useNavigate();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [password, setPassword] = useState();
  const [snackbar, setSnackbar] = useState({
    title: "",
    message: "",
    type: "",
    visible: false,
  });

  const truePassword = "Friboi@123";

  useEffect(() => {
    if (sessionStorage.getItem("rAreaLogged")) {
      navigate("/menu-area-restrita");
    }
  }, []);

  const showSnackbar = async (title, message, type) => {
    setSnackbar({ title, message, type, visible: true });
    await sleep(4000);
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  const enter = () => {
    if (password != truePassword) {
      showSnackbar("Erro", "A senha está incorreta", "error");
      return;
    }

    sessionStorage.setItem("rAreaLogged", "true");
    navigate("/menu-area-restrita");
  };

  return (
    <section className="restricted-area-enter-section">
      <ReturnArrow lastEndpoint={"/configuracoes"} />
      <Snackbar
        type={snackbar.type}
        title={snackbar.title}
        message={snackbar.message}
        isVisible={snackbar.visible}
      />
      <div className="restricted-area-enter-container">
        <span className="restricted-area-enter-text-group">
          <h1 className="restricted-area-enter-h1">Área Restrita</h1>
          <p>Insira a senha para continuar</p>
        </span>

        <form className="restricted-area-enter-form" action="submit">
          <input
            className={`restricted-area-enter-input`}
            type="password"
            placeholder="Senha"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="restricted-area-enter-navigate-code"
            type="button"
            onClick={enter}
          >
            Avançar
          </button>
          <a
            className="restricted-area-enter-mailto"
            href={`mailto:${JSON.parse(localStorage.getItem("user")).email}`}
          >
            <p>
              Não sabe a senha? <strong>Contate seu administrador!</strong>
            </p>
          </a>
        </form>
      </div>
    </section>
  );
}

export default RestrictedAreaEnter;
