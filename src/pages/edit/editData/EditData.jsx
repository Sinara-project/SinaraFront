import "./EditData.css";
import { useState } from "react";
import Snackbar from "../../../components/snackbar/Snackbar";
import ReturnArrow from "../../../components/return-arrow/ReturnArrow";
import { useLocation, useNavigate } from "react-router-dom";

function EditData() {
  const location = useLocation();
  const navigate = useNavigate();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const { type } = location.state;

  const id = JSON.parse(localStorage.getItem("user")).id;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [snackbar, setSnackbar] = useState({
    title: "",
    message: "",
    type: "",
    visible: false,
  });

  const showSnackbar = async (title, message, type) => {
    setSnackbar({ title, message, type, visible: true });
    await sleep(4000);
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  const testPassword = () =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]).{8,}$/.test(
      password
    );

  const testConfirmPasswordIsEqualToPassword = () =>
    password === confirmPassword;

  const endScreen = async () => {
    await sleep(2500);
    navigate("/configuracoes");
  };

  const edit = () => {
    console.log("algo");

    if (!testPassword()) {
      showSnackbar(
        "Erro",
        "A senha deve ter pelo menos 8 caracteres, 1 símbolo, 1 letra maiúscula e 1 número.",
        "error"
      );
      return;
    }

    if (!testConfirmPasswordIsEqualToPassword()) {
      showSnackbar("Erro", "As senhas não conferem.", "error");
      return;
    }

    type == "normal" ? {
      // editarSenhaPorId(id);
    } : {
      // editarSenhaAreaRestrita(id);
    }

    showSnackbar("Sucesso", "A senha foi alterada com sucesso!", "success");
    endScreen();
  };
  return (
    <section className="edit-section">
      <ReturnArrow lastEndpoint={"/configuracoes"} />
      <Snackbar
        type={snackbar.type}
        title={snackbar.title}
        message={snackbar.message}
        isVisible={snackbar.visible}
      />
      <div className="edit-container">
        {type == "normal" ? (
          <span className="edit-text-group">
            <h1 className="edit-h1">Editar senha</h1>
            <p>Edite a senha da sua conta</p>
          </span>
        ) : (
          <span className="edit-text-group">
            <h1 className="edit-h1">Editar senha</h1>
            <p>Edite a senha da sua área restrita</p>
          </span>
        )}

        <form className="edit-form" action="submit">
          <input
            className={`edit-input`}
            type="password"
            placeholder="Senha"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            className={`edit-input`}
            type="password"
            placeholder="Confirmar senha"
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button className="edit-navigate-code" type="button" onClick={edit}>
            Editar
          </button>
        </form>
      </div>
    </section>
  );
}

export default EditData;
